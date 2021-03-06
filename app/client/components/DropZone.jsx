const React = require('react');
const Dropzone = require('react-dropzone');
const {Button, Thumbnail} = require('react-bootstrap');
import axios from 'axios';
import {CLOUDINARY_UPLOAD_URL, CLOUDINARY_UPLOAD_PRESET} from '../constants';
import { Row, Col } from 'react-flexbox-grid';

class DropzoneComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
    this.onDrop = this.onDrop.bind(this);
  }
  onDrop(acceptedFiles, rejectedFiles){
    acceptedFiles = acceptedFiles.map((file) => {
      file.isUploaded = false;
      return file;
    });
    this.setState({
      files: [...acceptedFiles, ...this.state.files]
    });
    acceptedFiles.map((file)=> this.handleUpload(file));
  }
  handleUpload(file){
    console.log('file is');
    console.log(file);

    let data = new FormData();
    data.append('file', file);
    data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    let promise = axios.post(CLOUDINARY_UPLOAD_URL, data)
      .then((res)=> {
        let files = this.state.files.map((f) => {
          if (f.url === file.url){
            f.isUploaded = true;
          }
          return f;
        });
        this.setState({files});
        this.props.handleImageData(res.data);
        console.log(res);
      });
    this.props.addPendingPromise(promise);
  }
  render(){
    return (
      <Row center='xs'>
        <Col xs>
          <Row>
            <Col xs>
              <Dropzone
                ref={(node) => { this.dropzone = node; }}
                multiple={true}
                accept="image/*"
                style={{
                  height: '300px',
                  borderWidth: '2px',
                  borderStyle: 'dashed',
                  borderRadius: '5px',
                  borderColor: 'rgb(102, 102, 102)'
                }}
                onDrop={this.onDrop}>
                <div style={{padding: 30}}>
                  Upload images here (or click to choose)
                  <br />
                  <span style={{paddingLeft: 40, fontSize: 50}} className="glyphicon glyphicon glyphicon-download" />
                </div>
              </Dropzone>
            </Col>
          </Row>
          {this.state.files.length > 0 ?
              <Row>
                {this.state.files.map((file, i) => {
                  return (
                    <Col key={i} xs={2}>
                      {file.isUploaded ? null : "Uploading..."}
                      <Thumbnail style={{paddingRight: 10}} src={file.preview} />
                    </Col>
                  );
                })}
              </Row>
              : null
          }
        </Col>
      </Row>
    );
  }
}
export default DropzoneComponent;
