'use strict'

const express = require('express')
const router = express.Router()
const { mongo } = require('../utils/mongo')
const Ajv = require('ajv')
const { ObjectId } = require('mongodb')

const ajv = new Ajv() // create a new instance of the Ajv class

// category schema
const categorySchema = {
  type: 'object',
  properties: {
    categoryName: { type: 'string' },
    backgroundColor: { type: 'string' }
  },
  required: ['categoryName', 'backgroundColor'],
  additionalProperties: false
}

// define a schema to validate a new task
const taskSchema = {
  type: 'object',
  properties: {
    text: { type: 'string' },
    category: categorySchema
  },
  required: ['text', 'category'],
  additionalProperties: false
}

const tasksSchema = {
  type: 'object',
  required: ['todo', 'done'],
  additionalProperties: false,
  properties: {
    todo: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string'},
          text: { type: 'string'},
          category: categorySchema
        },
        required: ['_id', 'text', 'category'],
        additionalProperties: false
      }
    },
    done: {
      type: 'array',
      items: {
        properties: {
          _id: { type: 'string'},
          text: { type: 'string'},
          category: categorySchema
        },
        required: ['_id', 'text', 'category'],
        additionalProperties: false
      }
    }
  }
}

/**
 * findAllTasks
 */
router.get('/:empId/tasks', (req, res, next) => {
  try {
    console.log('findAllTasks API')

    let { empId } = req.params // get the empId
    empId = parseInt(empId, 10) // parse the empId to an int

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo( async db => {
      const tasks = await db.collection('employees').findOne(
        { empId },
        { projection: { empId: 1, todo: 1, done: 1} }
      )

      console.log('tasks', tasks)

      if (!tasks) {
        const err = new Error('Unable to find tasks for empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.send(tasks) // return the tasks array

    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

/**
 * createTask
 */
router.post('/:empId/tasks', (req, res, next) => {
  try {
    console.log('createTask API')

    let { empId } = req.params
    empId = parseInt(empId, 10)

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {

      const employee = await db.collection('employees').findOne({ empId })

      console.log('employee', employee)

      if (!employee) {
        const err = new Error('Unable to find employee with empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      const { task } = req.body

      console.log('New task: ', task)
      console.log('body', req.body)

      // validate the req object
      const validator = ajv.compile(taskSchema)
      const valid = validator(task)

      console.log('valid', valid)

      if (!valid) {
        const err = new Error('Bad Request')
        err.status = 400
        err.errors = validator.errors
        console.log('req.body validation failed', err)
        next(err)
        return
      }

      // build the task object to insert into MongoDB atlas
      const newTask = {
        _id: new ObjectId(),
        text: task.text,
        category: task.category
      }

      const result = await db.collection('employees').updateOne(
        { empId },
        { $push: { todo: newTask }}
      )

      console.log('result', result)

      if (!result.modifiedCount) {
        const err = new Error('Unable to create tasks for empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.status(201).send({ id: newTask._id })

    }, next)

  } catch (err) {
    console.log('err', err)
    next(err)
  }
})

/**
 * updateTask
 */
router.put('/:empId/tasks', (req, res, next) => {
  try {

    let { empId } = req.params
    empId = parseInt(empId, 10)

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {

      const employee = await db.collection('employees').findOne({ empId })
      console.log('employee', employee)

      if (!employee) {
        const err = new Error('Unable to find employee with empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      const tasks = req.body
      console.log('tasks', tasks)

      const validator = ajv.compile(tasksSchema)
      const valid = validator(tasks)
      console.log('valid', valid)

      if (!valid) {
        const err = new Error('Bad Request')
        err.status = 400
        err.errors = validator.errors
        console.log('req.body validation failed', err)
        next(err)
        return
      }

      const result = await db.collection('employees').updateOne(
        { empId },
        { $set: { todo: tasks.todo, done: tasks.done } }
      )

      if (!result.modifiedCount) {
        const err = new Error('Unable to update tasks for empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      res.status(204).send()

    }, next)

  } catch(err) {
    console.log('err', err)
    next(err)
  }
})

/**
 * deleteTasks
 */
router.delete('/:empId/tasks/:taskId', (req, res, next) => {
  console.log('inside the delete tasks function')

  try {
    let { empId } = req.params
    const { taskId } = req.params

    console.log(`EmpId: ${empId}; TaskId: ${taskId}`)

    empId = parseInt(empId, 10)

    if (isNaN(empId)) {
      const err = new Error('input must be a number')
      err.status = 400
      console.log('err', err)
      next(err)
      return
    }

    mongo(async db => {

      let emp = await db.collection('employees').findOne({ empId })

      console.log('emp', emp)

      if (!emp) {
        const err = new Error('Unable to find employee with empId ' + empId)
        err.status = 404
        console.log('err', err)
        next(err)
        return
      }

      if (!emp.todo) emp.todo = []
      if (!emp.done) emp.done = []

      const todoItems = emp.todo.filter(task => task._id.toString() !== taskId.toString())
      const doneItems = emp.done.filter(task => task._id.toString() !== taskId.toString())

      console.log(`Todo item: ${todoItems}; Done item: ${doneItems}`)

      const result = await db.collection('employees').updateOne(
        { 'empId': empId },
        {$set: { todo: todoItems, done: doneItems }}
      )

      console.log('result', result)

      res.status(204).send()
    }, next)
  } catch(err) {
    console.log('err', err)
    next(err)
  }
})

module.exports = router