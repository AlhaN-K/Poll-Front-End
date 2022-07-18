import "./homePage.css";
import poll from "../../imgs/poll.svg";
const Home = () => {
  return (
    <>
      <main class="main">
        {/* Landing  */}
        <section class="landing">
          <div class="landing-text">
            <h1>Schedule your events!</h1>
            <p>
              Pollymar let you send people a set of times and see which one
              works best for your event.
            </p>
            <a href="#url-shorten-form" class="btn btn-lg">
              Create Poll
            </a>
          </div>
          <div class="landing-image">
            <img src={poll} alt="poll Illustration" />
          </div>
        </section>
        {/* Features */}
        <section class="features" id="features">
          <div class="container">
            {/* Advanced Features */}
            <div class="more-features">
              <div class="section-header">
                <h2>Advanced Features</h2>
                <p>This is what we offer to you:</p>
              </div>
              <div class="more-features-content">
                <div class="feature">
                  <div class="feature-illustration">
                    <img
                      src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-brand-recognition.svg"
                      alt="Feature Illustration Icon"
                    />
                  </div>
                  <div class="feature-details">
                    <h3>Easy scheduling</h3>
                    <p>
                      Easily schedule meetings, create polls and message boards.
                    </p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-illustration">
                    <img
                      src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-detailed-records.svg"
                      alt="Feature Illustration Icon"
                    />
                  </div>
                  <div class="feature-details">
                    <h3>Unlimited</h3>
                    <p>
                      Create as many polls as you want. Invite as many
                      participants as you want.
                    </p>
                  </div>
                </div>
                <div class="feature">
                  <div class="feature-illustration">
                    <img
                      src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-fully-customizable.svg"
                      alt="Feature Illustration Icon"
                    />
                  </div>
                  <div class="feature-details">
                    <h3>Customizable</h3>
                    <p>Create custom poll designs as much as you want.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
