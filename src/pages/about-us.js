import './about-us2.css'
import 'bootstrap/dist/css/bootstrap.css';
// import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function about_us() {
  return (
    <section className='team'>
      <div className="container">
        {/* <div className="nav">
          <a href='https://ischool.uw.edu/capstone'>
              <img src='/img/iSchoolPrimary_RGB_Black.jpg' alt="information school logo" className='logo'/>
          </a>
          <div className="nav-items">
              <a href='page'>Home</a>
              <a href='register'>Sign Up</a>
              <a href='login'>Login</a>
          </div>
        </div> */}
        <h1>PENTALINGO</h1>
        <div className='row'>
          <div className='col-md-4 profile text-center'>
            <div className='img-box'>
              <img src="/img/alyssa.jpg"  className='img-responsive text-center' alt='picture of team member Alyssa'/>
                <ul>
                  <a href='https://www.linkedin.com/in/alyssa-vo/'>
                    <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                  </a>
                </ul>
            </div>
            <h2>Alyssa Vo</h2>
            <h3>Project Manager / UX Designer</h3>
          </div>
          <div className='col-md-4 profile text-center'>
            <div className='img-box'>
              <img src="/img/andrew.png"  className='img-responsive' alt='picture of team member Andrew'/>
                <ul>
                  <a href='https://www.linkedin.com/in/andrew-michaels/'>
                    <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                  </a>
                </ul>
            </div>
            <h2>Andrew Michaels</h2>
            <h3>Frontend / Backend Developer</h3>
          </div>
          <div className='col-md-4 profile text-center'>
            <div className='img-box'>
              <img src="/img/jojo.png"  className='img-responsive' alt='picture of team member Jo Jo'/>
                <ul>
                  <a href='https://www.linkedin.com/in/jojo-gong/'>
                    <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                  </a>
                </ul>
            </div>
            <h2>Jo Jo Gong</h2>
            <h3>Frontend / Backend Developer</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mt-4 profile text-center'>
              <div className='img-box'>
                <img src="/img/jessie.jpg"  className='img-responsive' alt='picture of team member Jessie'/>
                  <ul>
                    <a href='https://www.linkedin.com/in/alyssa-vo/'>
                      <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                    </a>
                  </ul>
              </div>
              <h2>Jessie Zeng</h2>
              <h3>Data Scientist</h3>
            </div>
            <div className='col-md-6 mt-4 profile text-center'>
              <div className='img-box'>
                <img src="/img/sang-won.jpg"  className='img-responsive' alt='picture of team member Sang-Won'/>
                  <ul>
                    <a href='https://www.linkedin.com/in/sang-won-yu-405110253/'>
                      <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                    </a>
                  </ul>
              </div>
              <h2>Sang-Won Yu</h2>
              <h3>Data Scientist</h3>
            </div>
          </div>
      </div>

      <div className="container mt-5 border-1">
        <h1>CONLANGERS</h1>
        <div className='row'>
          <div className='col-md-4 profile text-center'>
            <div className='img-box'>
              <img src="/img/sam.png"  className='img-responsive text-center' alt='picture of team member Samuel'/>
                <ul>
                  <a href='https://www.linkedin.com/in/samuel-lucia/'>
                    <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                  </a>
                </ul>
            </div>
            <h2>Samuel Lucia</h2>
            <h3>Project Manager / Fullstack Designer</h3>
          </div>
          <div className='col-md-4 profile text-center'>
            <div className='img-box'>
              <img src="/img/bryan.png"  className='img-responsive' alt='picture of team member Bryan'/>
                <ul>
                  <a href='https://www.linkedin.com/in/bryan-ahaneku/'>
                    <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                  </a>
                </ul>
            </div>
            <h2>Bryan Ahaneku</h2>
            <h3>Data Scientist / Frontend Developer</h3>
          </div>
          <div className='col-md-4 profile text-center'>
            <div className='img-box'>
              <img src="/img/lance.jpg"  className='img-responsive' alt='picture of team member Lance'/>
                <ul>
                  <a href='https://www.linkedin.com/in/lance-haugen/'>
                    <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                  </a>
                </ul>
            </div>
            <h2>Lance Haugen</h2>
            <h3>SWE / Data Analyst</h3>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-6 mt-4 profile text-center'>
              <div className='img-box'>
                <img src="/img/gavin.jpg"  className='img-responsive' alt='picture of team member Gavin'/>
                  <ul>
                    <a href='https://www.linkedin.com/in/gavin-hyppa/'>
                      <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                    </a>
                  </ul>
              </div>
              <h2>Gavin Hyppa</h2>
              <h3>UX Designer</h3>
            </div>
            <div className='col-md-6 mt-4 profile text-center'>
              <div className='img-box'>
                <img src="/img/wintana.jpg"  className='img-responsive' alt='picture of team member Wintana'/>
                  <ul>
                    <a href='https://www.linkedin.com/in/wintana-eyob'>
                      <li> <FontAwesomeIcon icon={faLinkedin} className="fa-brands" /></li>
                    </a>
                  </ul>
              </div>
              <h2>Wintana Eyob</h2>
              <h3>UX/UI Designer & Researcher</h3>
            </div>
          </div>
      </div>

    </section>
  );
}