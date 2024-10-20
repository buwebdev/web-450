module.exports = {
  composerService: createComposerService()
}

function createComposerService() {
  const database = {
    1: { firstName: 'Johann', lastName: 'Bach', genre: 'Baroque' },
    2: { firstName: 'Ludwig', lastName: 'Beethoven', genre: 'Classical' },
    3: { firstName: 'Richard', lastName: 'Wagner', genre: 'Romantic' },
    4: { firstName: 'Philip', lastName: 'Glass', genre: 'Contemporary' }
  }

  return {
    getAllComposers,
    getComposerById,
    addComposer,
    modifyComposer,
    deleteComposer,
  }

  // Retrieve all composers from the database
  async function getAllComposers() {
    return database;
  }

  // Retrieve a specific composer by ID
  async function getComposerById(id) {
    if (!database.hasOwnProperty(id)) {
      throw new Error('Composer not found in the database');
    }
    return database[id];
  }

  // Add a new composer to the database
  async function addComposer(id, data) {
    if (database.hasOwnProperty(id)) {
      throw new Error('Composer with this ID already exists');
    }
    database[id] = data;
    return id;
  }

  // Update an existing composer in the database
  async function modifyComposer(id, data) {
    if (!database.hasOwnProperty(id)) {
      throw new Error('Composer not found in the database');
    }
    database[id] = data;
    return id;
  }

  // Delete a composer from the database
  async function deleteComposer(id) {
    if (!database.hasOwnProperty(id)) {
      throw new Error('Composer not found in the database');
    }
    delete database[id];
    return id;
  }
}