const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');
moment.locale('tr');

const DocumentSchema = new Schema(
  {
    companyName: {
      type: String
    },
    description: {
      type: String
    },
    documentType: {
      type: String
    },
    userName: {
      type: String
    },
    date: {
      type: String,
      default: moment().format('L')
    }
  },
  {
    timestamps: true
  }
);

const Document = mongoose.model('Document', DocumentSchema, 'documents');
module.exports = Document;
