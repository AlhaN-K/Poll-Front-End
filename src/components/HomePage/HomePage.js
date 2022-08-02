import "./HomePage.css";
import poll from "../../imgs/poll.svg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <main className="main">
        {/* Landing  */}
        <section className="landing">
          <div className="landing-text">
            <h1>Schedule your events!</h1>
            <p>
              Pollymar let you send people a set of times and see which one
              works best for your event.
            </p>

            <div className="btn btn-lg" onClick={() => navigate("createPoll")}>
              Create Poll
            </div>
          </div>
          <div className="landing-image">
            <img src={poll} alt="poll Illustration" />
          </div>
        </section>
        {/* Features */}
        <section className="features" id="features">
          <div className="container">
            {/* Advanced Features */}
            <div className="more-features">
              <div className="section-header">
                <h2>Advanced Features</h2>
                <p>This is what we offer to you:</p>
              </div>
              <div className="more-features-content">
                <div className="feature">
                  <div className="feature-illustration">
                    <img
                      src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-brand-recognition.svg"
                      alt="Feature Illustration Icon"
                    />
                  </div>
                  <div className="feature-details">
                    <h3>Easy scheduling</h3>
                    <p>
                      Easily schedule meetings, create polls and message boards.
                    </p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-illustration">
                    <img
                      src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-detailed-records.svg"
                      alt="Feature Illustration Icon"
                    />
                  </div>
                  <div className="feature-details">
                    <h3>Unlimited</h3>
                    <p>
                      Create as many polls as you want. Invite as many
                      participants as you want.
                    </p>
                  </div>
                </div>
                <div className="feature">
                  <div className="feature-illustration">
                    <img
                      src="https://raw.githubusercontent.com/MohamedAridah/frontendmentor_url-shortening-api/main/images/icon-fully-customizable.svg"
                      alt="Feature Illustration Icon"
                    />
                  </div>
                  <div className="feature-details">
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
