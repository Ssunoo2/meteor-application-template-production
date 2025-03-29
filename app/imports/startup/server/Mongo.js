import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
/* eslint-disable no-console */

// Initialize the database with a default data document.
function loadJSON(filePath) {
  console.log(`Attempting to load JSON from: ${filePath}`);
  try {
    // eslint-disable-next-line no-undef
    const jsonData = Assets.getText(filePath);
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error loading JSON from ${filePath}: ${error}`);
    return null;
  }
}

function initializeCollection(collection, defaultData, collectionName) {
  if (collection.count() === 0 && defaultData) {
    console.log(`Creating default ${collectionName}.`);
    defaultData.forEach(data => {
      try {
        collection.define(data);
        console.log(`Added: ${data.name} to ${collectionName}`);
      } catch (error) {
        console.error(`Error adding ${data.name} to ${collectionName}: ${error}`);
      }
    });
  }
}

if (Meteor.isServer) {
  const testData = loadJSON('test.json');
  console.log(testData);

  // const defaultClasses = loadJSON('data/defaultClasses.json');
  // initializeCollection(classescollection, defaultClasses, 'classes');
}

function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
