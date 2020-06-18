import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MzFlashGroup = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <section className="mz-flash-group">
      <div className="row">
        <div className="col-2 box-1">
          <i class="fa fa-caret-up fa-3x"></i>
          <div className="box-css">
            <div id="demo">
              <div className="cv-carousel">
                <div className="item">
                  <h4>1</h4>
                </div>
                <div className="item">
                  <h4>2</h4>
                </div>
                <div className="item">
                  <h4>3</h4>
                </div>
                <div className="item">
                  <h4>4</h4>
                </div>
                <div className="item">
                  <h4>5</h4>
                </div>
                <div className="item">
                  <h4>6</h4>
                </div>
                <div className="item">
                  <h4>7</h4>
                </div>
                <div className="item">
                  <h4>8</h4>
                </div>
                <div className="item">
                  <h4>9</h4>
                </div>
                <div className="item">
                  <h4>10</h4>
                </div>
                <div className="item">
                  <h4>11</h4>
                </div>
                <div className="item">
                  <h4>12</h4>
                </div>
              </div>
            </div>
          </div>
          <i class="fa fa-caret-down fa-3x"></i>
        </div>
        <div className="col-6 box-2 tab">
          <div className="row">
            <div
              className={`col-4 ${activeTab === 1 && 'active'}`}
              onClick={() => setActiveTab(1)}
            >
              <button className="tablinks">
                <img
                  src="https://placeimg.com/640/480/any"
                  alt="Snow"
                  className="img-css"
                />
              </button>
            </div>
            <div
              className={`col-4 ${activeTab === 2 && 'active'}`}
              onClick={() => setActiveTab(2)}
            >
              <button className="tablinks">
                <img
                  src="https://placeimg.com/640/480/any"
                  alt="Forest"
                  className="img-css"
                />
              </button>
            </div>
            <div
              className={`col-4 ${activeTab === 3 && 'active'}`}
              onClick={() => setActiveTab(3)}
            >
              <button className="tablinks">
                <img src="https://placeimg.com/640/480/any" alt="Mountains" className="img-css" />
              </button>
            </div>
          </div>
          <div className="box-container">
            {activeTab === 1 &&
              <div className="sub-box tabcontent" id="tab1">
                <div className="row">
                  <div className="col-3">
                    <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
                  </div>
                  <div className="col-7">
                    <span>tab 1 content</span>
                    <span className="name-btn BT-2"><Link to="#">Button</Link></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. </p>
                    <div id="outer">
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {activeTab === 2 &&
              <div className="sub-box tabcontent" id="tab2">
                <div className="row">
                  <div className="col-3">
                    <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
                  </div>
                  <div className="col-7">
                    <span>tab 2 content</span>
                    <span className="name-btn BT-2"><Link to="#">Button</Link></span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. </p>
                    <div id="outer">
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                    </div>
                  </div>
                </div>
              </div>
            }
            {activeTab === 3 &&
              <div className="tabcontent" id="tab3">
                <div className="sub-box">
                  <div className="row">
                    <div className="col-3">
                      <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
                    </div>
                    <div className="col-7">
                      <span>Tab 3 content</span>
                      <span className="name-btn BT-2"><Link to="#">Button</Link></span>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua. </p>
                      <div id="outer">
                        <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                        <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                        <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" sub-box row">
                  <div className="col-3">
                    <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
                  </div>
                  <div className="col-7">
                    <span>Name</span>
                    <span className="name-btn BT-2">
                      <Link to="#">Button</Link>
                    </span>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. </p>
                    <div id="outer">
                      <div className="inner">
                        <span className="name-btn">
                          <Link to="#">Button</Link></span></div>
                      <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                    </div>
                  </div>
                  <div className="col-2"> <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
                    <div className="box-2-inner"><Link to="#" className="btn-style">Button</Link></div>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
        <div className="col-4 box-3">
          <form action="#" className="form-inline">

            <input type="text" id="fname" name="fname" defaultValue="John" /><br />

            <input type="submit" defaultValue="Submit" />
          </form>

          <div className="sub-box">
            <div className="row">
              <div className="col-3">
                <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
              </div>
              <div className="col-7">
                <span>tab 1 content</span>
                <span className="name-btn BT-2"><Link to="#">Button</Link></span>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. </p>
                <div id="outer">
                  <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                  <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                  <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
                </div>
              </div>
            </div>
          </div>
          <div className=" sub-box row">
            <div className="col-3">
              <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
            </div>
            <div className="col-7">
              <span>Name</span>
              <span className="name-btn BT-2">
                <Link to="#">Button</Link>
              </span>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. </p>
              <div id="outer">
                <div className="inner">
                  <span className="name-btn">
                    <Link to="#">Button</Link></span></div>
                <div className="inner"><span className="name-btn"><Link to="#">Button</Link></span></div>
              </div>
            </div>
            <div className="col-2"> <img src="https://placeimg.com/640/480/any" alt="Snow" className="img-css" />
              <div className="box-2-inner"><Link to="#" className="btn-style">Button</Link></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MzFlashGroup;
