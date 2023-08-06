var post = []

const doGetPost = (req, res) => {
    console.log('get post is running')
    res.json({ data: post })
}
const doCreatePost = (req, res) => {
    console.log(req.body);
    post.push(req.body);
    res.json({ data: post });
}
const doDeletePost = (req, res) => {
    const updatePost = post.filter(post => post.id != req.query.id)
    post = updatePost
    res.json({ updatdPost: post })
}
const doUpdatePost = (req, res) => {
    const updatedPost = post.map((post) => {
        if (post.id == req.body.id) {
            const update = {
                ...post,
                creator: req.body.creator || post.creator,
                postTitle: req.body.postTitle,

            }
            console.log(update)
            return update
        }
        else {
            return post
        }
    })
    post = updatedPost
    res.json({ data: post })
}

module.exports = { doGetPost, doCreatePost, doDeletePost, doUpdatePost }