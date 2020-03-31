import React from 'react';
import axios from 'axios';
import { Image, Table } from 'react-bootstrap';
import DownloadImageBtn from './DownloadImageBtn';
import docker_logo from '../images/docker-logo-6D6F987702-seeklogo.com.png';
import python_logo from '../images/python-logo-A32636CAA3-seeklogo.com.png';
import redis_logo from '../images/redis-logo-E403D4DD6A-seeklogo.com.png';
import mariadb_logo from '../images/mariadb-logo-3CC78F4035-seeklogo.com.png';
import mongodb_logo from '../images/mongodb.png';
import nodejs_logo from '../images/nodejs-logo-54107C5EDD-seeklogo.com.png';
import ruby_logo from '../images/ruby-logo-087AF79367-seeklogo.com.jpg';
import postgres_logo from '../images/PostgreSQL_logo.3colors.120x120.png';
import nginx_logo from '../images/nginx-logo_large.png';
import alpine_logo from '../images/alpine_logo.jpeg';
import ubuntu_logo from '../images/ubuntu-logo32.png';
import centos_logo from '../images/centos-logo-348x350-c.png';
import redhat_logo from '../images/redhat_logo.png';
// import golang_gopher_logo from '../images/golang_logo.png';
import golang_logo from '../images/1200px-Go_Logo_Blue.svg.png';
import hello_world_logo from '../images/hello-world_logo.png';

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
    {/* TODO: change unit based on image size */}
    <td>{props.image.Size / 1000 } kB</td>
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
    
    let imageMap = {
      'python': python_logo,
      'redis': redis_logo,
      'mariadb': mariadb_logo,
      'mongo': mongodb_logo,
      'node': nodejs_logo,
      'ruby': ruby_logo,
      'postgres': postgres_logo,
      'nginx': nginx_logo,
      'alpine': alpine_logo,
      'ubuntu': ubuntu_logo,
      'centos': centos_logo,
      'redhat': redhat_logo,
      'golang': golang_logo,
      'hello-world': hello_world_logo,

    }
    if (imageMap[repo]) {
      return <Image src={imageMap[repo]} height="25" width="25"/>
    } else {
      // use docker logo for default image
      return <Image src={docker_logo} height="25" width="25"/>
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