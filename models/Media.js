const { Schema, model } = require('mongoose' );

const MediaSchema = Schema({
    serial: {
        type: String,
        unique: true,
        required: true,
      },
      titulo: {
        type: String,
        required: true,
      },
      sinopsis: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        unique: true,
        required: true,
      },
      portada: {
        type: String,
        required: true,
      },
      añoEstreno: {
        type: Number,
        required: true,
      },
      genero: {
        type: String,
        required: true,      
      },
      director: {
        type: String,
        required: true,      
      },
      productora: {
        type: String,
        required: true,      
      },
      tipo: {
        type: String,
        required: true,      
      },
    },
    {
        timestamps: true
    });

module.exports = model('Media', MediaSchema);