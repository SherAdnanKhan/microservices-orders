import React from "react";

const Privacy = () =>{
  return(
      <div class="privacy">
        <div class="privacy-header">
          <label>Galleries</label>
        </div>
        <div class="wrapper gallery-section">
          <div class="toggle-data">
            <div class="data-box">
              <i class="fa fa-times"></i>
              <label for="">Gallery 1</label>
              <div class="lock-bar">
                <i class="fas fa-lock-open"></i>
                <i class="fas fa-chevron-down down-tab1"></i>
                <i class="fas fa-chevron-up up-tab1" ></i>
              </div>
            </div>
            <div class="show-data" id="tab1">
              <label for="">  Allowed to view </label>
              <div class="g-privacy-btn">
                <button>
                    Everyone
                  <i class="fas fa-lock-open"></i>
                </button>
                <button>
                  SPRFVs only
                  <i class="fas fa-lock">+</i>
                </button>
                <button>
                   Faves & SPRFVs only
                  <i class="fas fa-lock"></i>
                </button>
                <button>
                    Only Me
                  <i class="fas fa-lock">++</i>
                </button>
              </div>
            </div>
          </div>
        <div class="toggle-data">
          <div class="data-box">
            <i class="fa fa-times"></i>
            <label for="">Gallery 1</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab2"></i>
              <i class="fas fa-chevron-up up-tab2"></i>
            </div>
          </div>
          <div class="show-data" id="tab2">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                 SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="privacy-header">
        <label>Others</label>
      </div>
      <div class="wrapper gallery-section">
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/strqicon.png" alt="" />
            <label for="">Stro</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab3"></i>
              <i class="fas fa-chevron-up up-tab3" ></i>
            </div>
          </div>
          <div class="show-data" id="tab3">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
        {/* sdfd */}
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/mzflash.png" alt="" />
            <label for="">Mzflash</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab4"></i>
              <i class="fas fa-chevron-up up-tab4" ></i>
            </div>
          </div>
          <div class="show-data" id="tab4">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/crit1.png" alt="" />
            <label for="">Critiques</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab5"></i>
              <i class="fas fa-chevron-up up-tab5" ></i>
            </div>
          </div>
          <div class="show-data" id="tab5">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/faving.png" alt="" />
            <label for="">Faves</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab6"></i>
              <i class="fas fa-chevron-up up-tab6" ></i>
            </div>
          </div>
          <div class="show-data" id="tab6">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/favers.png" alt="" />
            <label for="">Faved By</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab7"></i>
              <i class="fas fa-chevron-up up-tab7" ></i>
            </div>
          </div>
          <div class="show-data" id="tab7">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/favers.png" alt="" />
            <label for="">Online Active</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab8"></i>
              <i class="fas fa-chevron-up up-tab8" ></i>
            </div>
          </div>
          <div class="show-data" id="tab8">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
        <div class="toggle-data">
          <div class="data-box">
            <img src="/assets/images/favers.png" alt="" />
            <label for="">Bio</label>
            <div class="lock-bar">
              <i class="fas fa-lock-open"></i>
              <i class="fas fa-chevron-down down-tab9"></i>
              <i class="fas fa-chevron-up up-tab9" ></i>
            </div>
          </div>
          <div class="show-data" id="tab9">
            <label for="">  Allowed to view </label>
            <div class="g-privacy-btn">
              <button>
                Everyone
                <i class="fas fa-lock-open"></i>
              </button>
              <button>
                SPRFVs only
                <i class="fas fa-lock">+</i>
              </button>
              <button>
                Faves & SPRFVs only
                <i class="fas fa-lock"></i>
              </button>
              <button>
                Only Me
                <i class="fas fa-lock">++</i>
              </button>
            </div>
          </div>
        </div>
      </div>
   </div>
  )
}
export default Privacy