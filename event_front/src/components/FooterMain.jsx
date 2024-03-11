import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import CaveatFont from './CaveatFont';
export default function App() {
  return (
    <MDBFooter  className='text-center text-lg-start text-muted'>
      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                <CaveatFont weight={500} fontSize="1.5rem" style={{ display: 'inline' }}><a href='/home'>Celebria</a></CaveatFont>
              </h6>
              <p>
                The only place where you can celebrate yourself without losing happiness...
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='/event' className='text-reset'>
                  Venue
                </a>
              </p>
              <p>
              <a href='/event' className='text-reset'>
                  Photography
                </a>
              </p>
              <p>
              <a href='/event' className='text-reset'>
                  Cakes
                </a>
              </p>
              <p>
              <a href='/event' className='text-reset'>
                  Food
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/home' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='/schedule' className='text-reset'>
                  Schedule
                </a>
              </p>
              <p>
                <a href='/quote' className='text-reset'>
                  Quote
                </a>
              </p>
              <p>
                <a href='/user' className='text-reset'>
                  Profile
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Coimbatore , TN , IND
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                celebria.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 99567 99789
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 77456 34521
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Celebria
      </div>
    </MDBFooter>
  );
}