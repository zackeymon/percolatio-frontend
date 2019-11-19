import React from 'react';
import { Modal, Button, InputNumber } from 'antd';

class Donation extends React.Component {
  state = {
    ModalText: 'Amount',
    visible: false,
    confirmLoading: false,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'Thank you! Your payment is being processed.',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div>
        <Button size="large" type="primary" onClick={this.showModal}>
          Sponsor
        </Button>
        <Modal
          title="Sponsor this foundation"
          visible={visible}
          okText="Submit"
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
          <InputNumber min={1} max={1000} defaultValue={50} />

        </Modal>
      </div>
    );
  }
}
export default Donation;
