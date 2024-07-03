import React, { useEffect, useState } from 'react'
import { Container, PostCard, PostForm } from "../components/index";
import appwriteServie from "../appwrite/configuration"
import { useNavigate, useParams } from 'react-router-dom';
function EditPost() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        if (slug) {
            appwriteServie.getPost(slug).then((post) => {
                if (post) {
                    setPost(post)
                }
            })
        }else {
            navigate('/')
        }
    },[slug, navigate])

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) : null
}

export default EditPost
