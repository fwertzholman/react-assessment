import React from 'react';

// OrderModal component
const OrderModal = ({ show, onClose, products }) => {
  // Props expected:
  // show: boolean - controls modal visibility
  // onClose: function - called to close the modal
  // products: array - list of product objects added to the order

  return (
    <div className={`modal fade ${show ? 'show d-block' : 'd-none'}`} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Products in Order</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {products.length === 0 ? (
              <p className="text-muted">No products added to the order yet.</p>
            ) : (
              <ul className="list-group">
                {products.map((product, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{product.title}</strong> <br />
                    <small className="text-muted">SKU: {product.sku}</small>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
