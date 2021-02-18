const { Post, User } = require('../models');

module.exports = {

    create: async (req, res) => {
        const { title, content } = req.body;
        const { userId: userId } = req;

        if(!title || !content) return res.status(400).json({message: 'Insira todos os dados!'});
        if(title.length > 80) return res.status(400).json({message: 'O título da postagem precisa ter no máximo 80 caracteres.'});

        const post = await Post.create({title, content, userId});

        return res.status(201).json({
            postTitle: post.title,
            postId: post.id
        });
    },

    get: async (req, res) => {
        const { id } = req.params;

        const post = await Post.findOne({
            where: { id },
            include: [{
                model: User
            }]
        });
        if(!post) return res.status(404).json({message: 'Postagem não encontrada'});

        return res.status(200).json({
            id: post.id,
            title: post.title,
            content: post.content,
            author: post.User.name,
            created_at: post.createdAt,
            updated_at: post.updatedAt
        });
    },

    list: async (req, res) => {
        const { page } = req.params;
        if(!page) return res.status(400).json({message: 'Insira o número da página'});

        let limit = 10
        let offset = 0 + (page - 1) * limit

        const posts = await Post.findAndCountAll({
            limit,
            offset,
            attributes: [
                'title',
                'id',
                'created_at'
            ],
            order: [
                ['updated_at', 'ASC']
            ],
            include: [{
                model: User,
                attributes: [
                    'name'
                ]
            }]
        });

        return res.status(200).json(posts);
    }

}