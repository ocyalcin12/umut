import React from 'react';
import { Button, Table, Form, Modal } from 'react-bootstrap';
import axios from 'axios';

const DocumentType = props => (
  <tr>
    <td>
      <center>{props.documentType.documentTypeName}</center>
    </td>
    <td>
      <center>
        <Button
          variant="danger"
          onClick={() => props.onDelete(props.documentType._id)}
          style={{ marginRight: '20px' }}
        >
          Sil
        </Button>
      </center>
    </td>
  </tr>
);

class DocumentTypes extends React.Component {
  state = {
    documentTypes: [],
    documentTypeName: '',
    show: false
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/documentTypes/')
      .then(response => {
        this.setState({ documentTypes: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  documentTypeList() {
    return this.state.documentTypes.map(currentDocType => {
      return (
        <DocumentType
          documentType={currentDocType}
          onDelete={this.onDelete}
          key={currentDocType._id}
        />
      );
    });
  }

  onDelete = id => {
    axios.delete('http://localhost:5000/documentTypes/' + id).then(response => {
      console.log(response.data);
    });

    this.setState({
      documumentTypes: this.state.documentTypes.filter(el => el._id !== id)
    });
    window.location.reload();
  };

  handleClose = () => this.setState({ show: false });
  handleShow = () => this.setState({ show: true });

  DocumentTypeModal = () => {
    return (
      <>
        <Button variant="success" type="submit" onClick={this.handleShow}>
          + Evrak Ekle
        </Button>

        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Firma Ekle</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Label>Evrak Tipi:</Form.Label>
              <Form.Control
                placeholder="* Evrak Tipini Giriniz"
                onChange={this.onChange}
                value={this.state.documentTypeName}
              />
              <Form.Text className="text-muted">* Girmek zorunludur.</Form.Text>
              <br />
              <Button
                variant="primary"
                type="submit"
                onClick={this.handleClose}
                style={{ marginRight: '20px' }}
              >
                Kaydet
              </Button>
              <Button variant="danger" onClick={this.handleClose}>
                Kapat
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
  };

  onSubmit = e => {
    e.preventDefault();

    const documentType = {
      documentTypeName: this.state.documentTypeName
    };

    //console.log(company);

    axios
      .post('http://localhost:5000/documentTypes/add', documentType)
      .then(res => {
        console.log(res.data);
        window.location.reload();
      });

    this.setState({
      documentTypeName: ''
    });
  };

  onChange = e => {
    this.setState({
      documentTypeName: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <h2>Evrak Tipleri</h2>
        <hr />
        <this.DocumentTypeModal />
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                <center>Evrak Tipi</center>
              </th>
              <th>
                <center>Düzenle</center>
              </th>
            </tr>
          </thead>
          <tbody>{this.documentTypeList()}</tbody>
        </Table>
      </div>
    );
  }
}

export default DocumentTypes;
