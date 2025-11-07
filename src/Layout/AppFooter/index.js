import React, { Fragment } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

class Footer extends React.Component {
    render() {
        return (
            <Fragment>
                {/* <div className="text-center bg-white" style={{ position: "fixed", bottom: "0", width: "100%", 
                boxShadow: "0.3rem -0.46875rem 2.1875rem rgba(8,10,37,.02), 0.3rem -0.9375rem 1.40625rem rgba(8,10,37,.02), 0.3rem -0.25rem 0.53125rem rgba(8,10,37,.04), 0.3rem -0.125rem 0.1875rem rgba(8,10,37,.02)"
                }}> */}
                <div className="app-footer">
                    <div className="app-footer__inner">
                        {/* <h6 >Extraordinary weddings don’t just happen, they are planned ~ Kerinci Stories ~</h6> */}
                        <div className="footer-dots" style={{ justifyContent: "center" }}>
                            <a href="https://colorlib.com/" className="btn-lg">
                                <FontAwesomeIcon icon={faFacebook} className="dot-btn-icon" color="#4B443C" />
                            </a>
                            <a href="https://colorlib.com/" className="btn-lg">
                                <FontAwesomeIcon icon={faTwitter} className="dot-btn-icon" color="#4B443C" />
                            </a>
                            <a href="https://colorlib.com/" className="btn-lg">
                                <FontAwesomeIcon icon={faInstagram} className="dot-btn-icon" color="#4B443C" />
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Footer;