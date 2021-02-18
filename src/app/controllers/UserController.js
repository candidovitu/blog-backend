const { User } = require('../models');

module.exports = {

    auth: async (req, res) => {
        const { email, password } = req.body;
        if(!email || !password) return res.status(400).json({message: 'Insira todos os dados!'});
        
        const user = await User.findOne({ where: { email } });
        if(!user) return res.status(401).json({message: 'Usuário não encontrado'});
        if(!(await user.checkPassword(password))) return res.status(401).json({message: 'Senha incorreta'});

        return res.status(200).json({
            id: user.id,
            username: user.name,
            token: user.generateToken()
        });
    },

    create: async (req, res) => {
        const { name, email, password } = req.body;
        if(!email || !password || !name) return res.status(400).json({message: 'Insira todos os dados!'});
        if(name.length > 16) return res.status(400).json({message: 'O nome de usuário precisa ter no máximo 16 caracteres.'});

        const userWithEmailExists = await User.findOne({ where: { email } });
        if(userWithEmailExists) return res.status(409).json({message: 'Este email já está registrado'});

        const user = await User.create({name, email, password});

        return res.status(201).json({
            user,
            token: user.generateToken()
        });
    }

}