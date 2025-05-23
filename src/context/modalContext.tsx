import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { CommentByPostId, PostResponse } from '../types/types';
import { useAuth } from './authContext';
import protectedService from './../services/protected';

interface ModalContextProps {
    open: boolean;
    postData: PostResponse | null;
    postComments: CommentByPostId[] | null;
    currentIndex: number;
    updatePostData: (updates: Partial<PostResponse>) => void
    handleOpen: (post: PostResponse) => void;
    handleClose: () => void;
    createComment: (content: string) => Promise<void>;
    handlePrevious: () => void;
    handleNext: () => void;
}

// Este es el detailedPostModal
const ModalContext = createContext<ModalContextProps | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
    const [ open, setOpen ] = useState(false); // Establece si el modal esta abierto o cerrado. El componente se renderiza en el Layout
    const [ postData, setPostData ] = useState<PostResponse | null>(null);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ postComments, setPostComments ] = useState<CommentByPostId[] | null>(null);

    const { token } = useAuth();

    // Resetea los estados cuando el modal se cierra
    useEffect(() => {
        if(!token) return;

        // Si postData no es null entonces
        if(postData){
            const getCommentsById = async () => {
                const response = await protectedService.getCommentsByPostId(token,postData.id);
                setPostComments(response.data);
            };
            getCommentsById();
        }

        setPostComments(null);

        if (!open) {
            setPostData(null);
            setCurrentIndex(0);
        }
    }, [ open ]);

    if(!token){
        return null;
    }

    const updatePostData = (updates: Partial<PostResponse>) => {
        // React permite que setState reciba una función, donde el argumento (currentPost)
        // es el estado más reciente antes de actualizarse. Esto es útil cuando el estado
        // se actualiza muchas veces y queremos asegurarnos de trabajar con el valor correcto.
        setPostData(currentPost => currentPost ? { ...currentPost, ...updates } : currentPost);
    };

    // Establece un nuevo post cuando se abre que viene de los post del usuario loggeado o de los postvisibles
    const handleOpen = (post: PostResponse) => { // A este handle Open, le pasan el post como parametro
        setOpen(true);
        setPostData(post);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const createComment = async (content: string) => {
        if(postData){
            const newComment = {
                content,
                postId: postData?.id
            };

            const response = await protectedService.createComment(token, newComment);

            // Agregar el nuevo comentario al estado actual sin hacer otra petición
            setPostComments(prevComments => [ response.data, ...(prevComments || []) ]);
        }
    };

    const handlePrevious = () => {
        if(currentIndex>0){
            const tempIndex = currentIndex -1;
            setCurrentIndex(tempIndex);
        }
    };

    const handleNext = () => {
        if(postData && currentIndex < postData.media.length){
            setCurrentIndex(currentIndex + 1);
        }
    };

    return (
        <ModalContext.Provider value={{ open, postData, postComments, currentIndex, updatePostData, handleOpen, handleClose, createComment, handlePrevious, handleNext }}>
            {children}
        </ModalContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useModal = () => {
    const context = useContext(ModalContext);
    if(!context){
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};