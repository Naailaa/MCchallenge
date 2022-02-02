const express = require('express')
const router = express.Router()
const Superhero = require('../models/superhero')

//Getting all
router.get('/', async (req, res) => {
    try {
      const superheros = await Superhero.find()
      res.json(superheros)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })
//Getting one
router.get('/:id', getSuperhero, (req, res) => {
    res.json(res.superhero)
  })
//Creating one
router.post('/', async (req, res) => {
    const superhero = new Superhero({
      name: req.body.name,
      gender: req.body.gender,
      strength: req.body.strength,
      speed: req.body.speed,
      intelligence: req.body.intelligence,
      
    })
    try {
      const newSuperhero = await superhero.save()
      res.status(201).json(newSuperhero)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
//Updating one 
router.patch('/:id', getSuperhero, async (req, res) => {
    if (req.body.name != null) {
      res.superhero.name = req.body.name
    }
    if (req.body.gender != null) {
      res.subscriber.gender = req.body.gender
    }
    if (req.body.strength != null) {
        res.superhero.strength = req.body.strength
    }
    if (req.body.speed != null) {
        res.subscriber.speed = req.body.speed
    }
    if (req.body.intelligence != null) {
        res.superhero.intelligence = req.body.intelligence
    }
    try {
      const updatedSuperhero = await res.superhero.save()
      res.json(updatedSuperhero)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  })
//Deleting one
router.delete('/:id', getSuperhero, async (req, res) => {
    try {
      await res.superhero.remove()
      res.json({ message: 'Deleted Superhero' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  })

async function getSuperhero(req, res, next) {
    let superhero
    try {
      superhero = await Superhero.findById(req.params.id)
      if (superhero == null) {
        return res.status(404).json({ message: 'Cannot find superhero' })
      }
    } catch (err) {
      return res.status(500).json({ message: err.message })
    }
  
    res.superhero = superhero
    next()
  }

module.exports = router