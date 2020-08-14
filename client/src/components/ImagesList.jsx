import React from 'react';
import axios from 'axios';
import { Image, Table } from 'react-bootstrap';
import DownloadImageBtn from './DownloadImageBtn';

import addDataSizeUnit from '../utils/addUnits';
import getImageMap from '../utils/getImageMap';


const PORT = process.env.LIGHTHOUSE_BACKEND_PORT || 5000;

const DockerImage = (props) => (
  <tr>
    <th scope="row">
      <div style={{float: 'left'}}>{props.image.thumbnail}</div> 
      <div style={{marginLeft: '40px'}}>{props.image.Repo}</div>
    </th>
    <td>{props.image.Tag}</td>
    <td>{props.image.Id}</td>
    <td>{props.image.Created}</td>
    <td>{addDataSizeUnit(props.image.Size)}</td>
  </tr>
)

export default class ImagesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  };

　componentDidMount() {
  axios.get(`http://localhost:${PORT}/images`)
    .then(res => {
      this.setState({
        images: res.data
      })
      console.log(this.state.images);
      console.log(PORT);
    })
    .catch(err => console.log(err));
  }

  imagesList() {
    return this.state.images.map(image => {
      // image tags
      if (image.RepoTags == null) {
        image.Tag = "<none>";
      } else {
        image.Tag = image.RepoTags[0].split(':')[1];
      }
      // repository
      if (image.RepoTags) {
        image.Repo = image.RepoTags[0].split(':')[0];
      } else if (image.RepoDigests) {
        image.Repo = image.RepoDigests[0].split('@')[0];
      };
      // thumbnail
      image.thumbnail = this.getThumbnail(image.Repo)
      // shorten image id
      image.Id = image.Id.split(':')[1].substring(0, 12);
      // TODO: make it prettier
      let createdDate = new Date(image.Created * 1000);
      image.Created = createdDate.toLocaleDateString();

      return <DockerImage image={image} key={image.Id}/>
    })
  }

  getThumbnail(repo) {
    const imageMap = getImageMap();
    if (imageMap[repo]) {
      return <Image src={imageMap[repo]} height="25" width="25"/>
    } else {
      // use docker logo for default image
      return <Image src={imageMap['docker']} height="25" width="25"/>
    }
  }

  render() {
    return (
      <div style={{margin: "40px 20px 100px 20px"}}>
        <h3>Downloaded Images</h3>
        <Table striped responsive>
          <thead>
            <tr>
              <th>REPOSITORY</th>
              <th>TAG</th>
              <th>IMAGE ID</th>
              <th>CREATED</th>
              <th>SIZE</th>
            </tr>
          </thead>
          <tbody>
            { this.imagesList() }
          </tbody>
        </Table>
        <DownloadImageBtn style={{marginBottom: "20px"}}/>
      </div>
    );
  }
}