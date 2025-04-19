import express from 'express';
import { commentPost, deleteComment, deletePost, getAllPost, getPostById, likePost, registerPost, updateComment, updatePost } from '../controller/postController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.post('/registerPost',authenticate, restrict(['user']), registerPost);
router.post('/likePost/:postId', authenticate, likePost);
router.post('/commentPost/:postId', authenticate, commentPost);
router.get('/allPosts', getAllPost);
router.get('/getPost/:id', getPostById)
router.put('/updateComment/:postId/:commentId', authenticate, restrict(['user']), updateComment);
router.put('/postUpdate/:postId', authenticate, restrict(['user']), updatePost);
router.delete('/postDelete/:postId', authenticate, restrict(['user']), deletePost);
router.delete('/commentDelete/:postId/:commentId', authenticate, restrict(['user']), deleteComment);


export default router;