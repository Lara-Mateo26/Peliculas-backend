const { Router } = require('express');
const {validationResult} = require('express-validator');
const Director = require('../models/Director');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/',
    async function(req, res) {
        try {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let director = new Director();

        director.nombres = req.body.nombres;
        director.estado = req.body.estado;

        director = await director.save();

        res.send(director);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:directorId',
    async function(req, res) {
        try {
            let director = await Director.findById(req.params.directorId);
            if (!director) {
                return res.send('director no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            director.nombres= req.body.nombres;
            director.estado = req.body.estado;

            director = await director.save();

            res.send(director);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

module.exports = router;