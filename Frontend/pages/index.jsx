import Head from "next/head";
import Modal from 'react-bootstrap/Modal';
import { useEthers } from "@usedapp/core";
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from "react";

const Home = () => {
  const [show, setShow] = useState(false);
  const [fullNameShow, setFullNameShow] = useState("");
  const [emailAddressShow, setEmailAddressShow] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  let { activateBrowserWallet, account } = useEthers();

  function handleShow(){
    setShow(true)
  }
  function handleClose(){
    setShow(false)
  }

  useEffect(() => {
    const accountId = account?.toString();
    fetch(`http://127.0.0.1:5000/meta/${accountId}`)
      .then(response => response.json())
      .then(response => {
        setEmailAddressShow(response.emailAddress)
        setFullNameShow(response.fullName)
        setMetamaskId(response.metamaskId)
      })
      .catch(err => console.error(err));
  })

  function ConnectMetaMask() {
    activateBrowserWallet();
  }

  function SliceAddress() {
    const walletAddress = account?.toString();
    if (!walletAddress) {
      return "";
    }
    return walletAddress
  }

  async function submitDetailsForm(e) {
    e.preventDefault()
    let metamaskId = account
    let data = { fullName, emailAddress, metamaskId }
    let result = await fetch(`http://127.0.0.1:5000/meta/edit_details/`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    let output = await result.json()
    if (output.emailAddress === emailAddress) {
      alert("Edit Successfully")
      const accountId = account?.toString();
      fetch(`http://127.0.0.1:5000/meta/${accountId}`)
        .then(response => response.json())
        .then(response => {
          setEmailAddressShow(response.emailAddress)
          setFullNameShow(response.fullName)
          setMetamaskIdShow(response.metamaskId)
        })
        .catch(err => console.error(err));
          handleClose()
    } else {
      alert(output.message)
    }
  }

  return (
    <div>
      <Head>
        <title>Metamask Web3 Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container pt-5" style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <h1 className="text-center"><u>MetaMask Login</u></h1>
        {account === undefined ? (
          <button style={{ background: "white", color: "black", border: "none", padding: "10px", fontWeight: "900", cursor: "pointer", marginTop: '20px' }} onClick={ConnectMetaMask}>
            Connect
          </button>
        ) : (
          <>
            <div className="mx-lg-5">
              <div className="px-md-5">
                <h2 className="mt-5">Your Metamask Id: {SliceAddress()}</h2>
                <div className="my-3">
                  <label for="exampleInputEmail1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" disabled value={emailAddressShow} />
                </div>
                <div className="mb-3">
                  <label for="exampleInputFullname" className="form-label">Full Name</label>
                  <input type="text" className="form-control" id="exampleInputFullname" disabled value={fullNameShow} />
                </div>
                <div className="row">
                  <div className="col-6" style={{ textAlign: 'right' }}>
                    <button type="submit" className="btn btn-primary">Save Details</button>
                  </div>
                  <div className="col-6">
                    <button type="button" className="btn btn-primary" onClick={()=>handleShow()}>Edit Details</button>
                  </div>
                </div>
              </div>
            </div>
            <Modal show={show} onHide={()=>handleClose()}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={(e) => submitDetailsForm(e)}>
                  <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" required autoComplete="off" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label for="exampleInputFullname" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="exampleInputFullname" required autoComplete="off" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                  </div>
                  <div className="text-center">
                    <Button variant="secondary" className="mx-2" onClick={()=>handleClose()}>
                      Close
                    </Button>
                    <button type="submit" className="btn btn-primary mx-2">
                      Save Changes
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
          </>
        )}
      </div>
    </div >
  );
};

export default Home;
