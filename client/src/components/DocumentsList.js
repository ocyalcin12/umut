import React from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Document = props => (
  <tr>
    <td>{props.document.companyName}</td>
    <td>
      <center>{props.document.documentType}</center>
    </td>
    <td>
      <center>{props.document.date}</center>
    </td>
    <td>
      <center>{props.document.description}</center>
    </td>
    <td>
      <center>{props.document.userName}</center>
    </td>
    <td>
      <center>
        <Button
          variant="danger"
          onClick={() => props.onDelete(props.document._id)}
          style={{ marginRight: '20px' }}
        >
          Sil
        </Button>
        <Link
          to={{
            pathname: '/EditDocument/' + props.document._id,
            myDocument: props.document
          }}
        >
          <Button variant="primary">Düzenle</Button>
        </Link>
      </center>
    </td>
  </tr>
);

class DocumentsList extends React.Component {
  state = {
    documents: [],
    companyName: '',
    documentType: '',
    description: '',
    searchTerm: ''
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/')
      .then(response => {
        this.setState({ documents: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  documentList() {
    if (!this.state.searchTerm) {
      return this.state.documents.map(currentDoc => {
        return (
          <Document
            document={currentDoc}
            onDelete={this.onDelete}
            key={currentDoc._id}
          />
        );
      });
    } else {
      return this.state.documents
        .filter(document => {
          return document.companyName
            .toLowerCase()
            .includes(this.state.searchTerm);
        })
        .map(matchingDocument => {
          return (
            <Document
              document={matchingDocument}
              onDelete={this.onDelete}
              key={matchingDocument._id}
            />
          );
        });
    }
  }

  onDelete = id => {
    axios.delete('http://localhost:5000/' + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      documents: this.state.documents.filter(el => el._id !== id)
    });
  };

  onSearchCompanyName = e => {
    e.preventDefault();
    this.setState({
      searchTerm: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <h2>Evrak Listesi</h2>
        <hr />
        <Link to="/AddDocument/">
          <Button variant="success">+ Evrak Ekle</Button>
        </Link>
        <hr />
        <h4>Arama</h4>
        <Form>
          <Form.Control
            placeholder="Firma Adı Giriniz"
            onChange={this.onSearchCompanyName}
            value={this.state.searchTerm}
          />
        </Form>
        <br />
        <br />
        <Table striped bordered hover responsive="sm">
          <thead>
            <tr style={{ backgroundColor: '#c3d7db' }}>
              <th>
                <center>Firma Adı</center>
              </th>
              <th>
                <center>Evrak Tipi</center>
              </th>
              <th>
                <center>Eklenme Tarihi</center>
              </th>
              <th>
                <center>Açıklama</center>
              </th>
              <th>
                <center>Giren Personel</center>
              </th>
              <th>
                <center>Düzenle</center>
              </th>
            </tr>
          </thead>
          <tbody>{this.documentList()}</tbody>
        </Table>
      </div>
    );
  }
}

export default DocumentsList;
