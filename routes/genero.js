const { Router } = require('express');
const {validationResult} = require('express-validator');
const Genero = require('../models/Genero');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarRolAdmin } = require('../middleware/validar-rol-admin');

const router = Router();

router.get('/', [validarJWT, validarRolAdmin], async function(req, res) {
    try {
        const generos = await Genero.find();
        res.send(generos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ messages: errors.array() });
        }

        let genero = new Genero();

        genero.nombre = req.body.nombre;
        genero.estado = req.body.estado;
        genero.descripcion = req.body.descripcion;

        genero = await genero.save();

        res.send(genero);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.put('/:generoId', [validarJWT, validarRolAdmin],
    async function(req, res) {
        try {
            let genero = await Genero.findById(req.params.generoId);
            if (!genero) {
                return res.send('genero no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;
            genero.descripcion = req.body.descripcion;

            genero = await genero.save();

            res.send(genero);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    }
});

<<<<<<< HEAD
router.delete('/:generoId', [validarJWT, validarRolAdmin],
=======
router.delete('/:generoId',
>>>>>>> 1ba103d5f804c84e0412356ac87ed982f994465f
    async function(req, res) {
        try {
            let genero = await Genero.findById(req.params.generoId);
            if (!genero) {
                return res.send('genero no existe');
            }

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ messages: errors.array() })
            }

            genero = await genero.deleteOne();

            res.send(genero);
    } catch (error){
        console.log(error);
        res.send('Ocurrio un error');
    } 
});

module.exports = router;