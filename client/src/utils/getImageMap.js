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

const getImageMap = () => {
  return {
    'docker': docker_logo,
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
    'hello-world': hello_world_logo
  }
} 

export default getImageMap;
