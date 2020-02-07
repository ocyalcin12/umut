import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

class AddDocument extends React.Component {
  state = {
    companies: [],
    documentTypes: [],
    users: [],
    companyName: '',
    documentTypeName: '',
    userName: '',
    description: ''
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            companies: response.data.map(company => company.companyName),
            companyName: response.data[0].companyName
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/documentTypes/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            documentTypes: response.data.map(
              documentType => documentType.documentTypeName
            ),
            documentTypeName: response.data[0].documentTypeName
          });
        }
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.userName),
            userName: response.data[0].userName
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();

    const document = {
      companyName: this.state.companyName,
      documentType: this.state.documentTypeName,
      description: this.state.description,
      userName: this.state.userName
    };

    axios
      .post('http://localhost:5000/add/', document)
      .then(res => console.log(res));

    window.location = '/';
  };

  onChangeCompanyName = e => {
    this.setState({
      companyName: e.target.value
    });
  };

  onChangeDocumentTypeName = e => {
    this.setState({
      documentTypeName: e.target.value
    });
    console.log(e.target.value);
  };

  onChangeDescription = e => {
    this.setState({
      description: e.target.value
    });
  };

  onChangeUserName = e => {
    this.setState({
      userName: e.target.value
    });
  };

  render() {
    return (
      <div style={{ marginLeft: '400px', marginRight: '400px' }}>
        <br />
        <h2>Evrak Ekle</h2>
        <hr></hr>
        <center>
          <Form onSubmit={this.onSubmit}>
            <Form.Label>
              <b>Firma Adı:</b>
            </Form.Label>
            <Form.Control
              size="lm"
              as="select"
              value={this.state.companyName}
              onChange={this.onChangeCompanyName}
            >
              {this.state.companies.map(function(company) {
                return (
                  <option key={company} value={company}>
                    {company}
                  </option>
                );
              })}
            </Form.Control>

            <br />

            <Form.Label>
              <b>Evrak Tipi:</b>
            </Form.Label>
            <Form.Control
              size="lm"
              as="select"
              value={this.state.documentTypeName}
              onChange={this.onChangeDocumentTypeName}
            >
              {this.state.documentTypes.map(function(documentType) {
                return (
                  <option key={documentType} value={documentType}>
                    {documentType}
                  </option>
                );
              })}
            </Form.Control>

            <br />

            <Form.Label>
              <b>Açıklama:</b>
            </Form.Label>
            <Form.Control
              size="lm"
              placeholder=" Açıklama Giriniz"
              onChange={this.onChangeDescription}
              value={this.state.description}
            />

            <br />

            <Form.Label>
              <b>Giren Personel:</b>
            </Form.Label>
            <Form.Control
              size="lm"
              as="select"
              value={this.state.userName}
              onChange={this.onChangeUserName}
            >
              {this.state.users.map(function(userName) {
                return (
                  <option key={userName} value={userName}>
                    {userName}
                  </option>
                );
              })}
            </Form.Control>
            <br />
            <Button variant="primary" type="submit" size="lm">
              Kaydet
            </Button>
          </Form>
        </center>
      </div>
    );
  }
}

export default AddDocument;
