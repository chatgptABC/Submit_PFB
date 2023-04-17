import { useState } from 'react';
import axios from 'axios';

function App() {
  const [namespace_id, setNS] = useState('0c204d39600fddd3');
  const [data, setData] = useState(
    'f1f20ca8007e910a3bf8b2e61da0f26bca07ef78717a6ea54165f5'
  );
  const [gas_limit, setGas] = useState(80000);
  const [fee, setFee] = useState(2000);
  const [resp, setResp] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setResp(null);
      setLoading(true);
      const url = '/submit_pfb';
      const res = await axios.post(url, {
        namespace_id,
        data,
        gas_limit,
        fee,
      });
      if (res && res.data && res.data.data) {
        setResp(res.data.data);
        setLoading(false);
      } else {
        setLoading(false);
        window.alert('Error occurred, please check the data');
      }
    } catch (err) {
      setLoading(false);
      window.alert('Error occurred, please check the data');
    }
  };

  return (
    <div className='container'>
      <h1>Submit a PFB Transaction</h1>
      {loading && <h2>Please Wait...</h2>}
      {!loading && resp && resp.txhash && (
        <h4>
          View on explorer:{' '}
          <a
            href={`https://testnet.mintscan.io/celestia-incentivized-testnet/txs/${resp.txhash}`}
            target='_blank'
            rel='noreferrer'
          >
            {resp.txhash}
          </a>
        </h4>
      )}
      <label htmlFor='ns'>Namespace Id</label>
      <input
        type='text'
        value={namespace_id}
        id='ns'
        onChange={(e) => setNS(e.target.value)}
      />
      Data{' '}
      <input
        type='text'
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <label htmlFor='gas'>Gas Limit</label>
      <input
        type='number'
        value={gas_limit}
        id='gas'
        onChange={(e) => setGas(e.target.value)}
      />
      <label htmlFor='fee'>Fee</label>
      <input
        type='number'
        value={fee}
        id='fee'
        onChange={(e) => setFee(e.target.value)}
      />
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
}

export default App;
