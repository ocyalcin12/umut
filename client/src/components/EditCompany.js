import React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

class EditCompany extends React.Component {
  state = {
    companyName: '',
    taxOffice: '',
    taxNumber: ''
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/companies/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          companyName: response.data.companyName,
          taxOffice: response.data.taxOffice,
          taxNumber: response.data.taxNumber
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();

    const company = {
      companyName: this.state.companyName,
      taxOffice: this.state.taxOffice,
      taxNumber: this.state.taxNumber
    };
    axios
      .post(
        'http://localhost:5000/companies/edit/' + this.props.match.params.id,
        company
      )
      .then(res => console.log(res.data));

    window.location = '/Companies/';
  };

  onChangeCompanyName = e => {
    this.setState({
      companyName: e.target.value
    });
  };

  onChangeTaxOffice = e => {
    this.setState({
      taxOffice: e.target.value
    });
  };

  onChangeTaxNumber = e => {
    this.setState({
      taxNumber: e.target.value
    });
  };

  render() {
    return (
      <div>
        <br />
        <h2>Firma Düzenle</h2>
        <hr />
        <Form onSubmit={this.onSubmit}>
          <Form.Label>Firma Adı:</Form.Label>
          <Form.Control
            size="sm"
            placeholder="Firma Adı Giriniz"
            onChange={this.onChangeCompanyName}
            value={this.state.companyName}
          />
          <br />
          <Form.Label>Vergi Dairesi:</Form.Label>
          <Form.Control
            size="sm"
            placeholder="Vergi Dairesini Giriniz"
            onChange={this.onChangeTaxOffice}
            value={this.state.taxOffice}
          />
          <br />
          <Form.Label>Vergi Numarası:</Form.Label>
          <Form.Control
            size="sm"
            placeholder="Vergi Numarasını Giriniz"
            onChange={this.onChangeTaxNumber}
            value={this.state.taxNumber}
          />
          <br />
          <Button variant="primary" type="submit">
            Kaydet
          </Button>
        </Form>
      </div>
    );
  }
}

export default EditCompany;
