import React, { useState } from "react"
import { Dropdown, Input, TextArea, Form } from 'semantic-ui-react'

export default function Paid() {
  const [paidStatus, setPaidStatus] = useState("TIENMAT")
  return <div className="cart_container paid-container">
    <h2 className="cart_container_title">Vui lòng chọn hình thức thanh toán</h2>
    <div className="list">
      <Form.Group inline>
        <Form.Radio
          label='Thanh toán bằng tiền mặt'
          value='TIENMAT'
          checked={paidStatus === 'TIENMAT'}
          onChange={() => setPaidStatus("TIENMAT")}
        />
        <Form.Radio
          label='Thanh toán bằng chuyển khoản'
          value='CHUYENKHOAN'
          checked={paidStatus === 'CHUYENKHOAN'}
          onChange={() => setPaidStatus("CHUYENKHOAN")}
        />
      </Form.Group>
      {paidStatus === 'CHUYENKHOAN' && <div>
        <div className="paid_title">Thông tin tài khoản</div>
        <div className="paid_info">
          <div className="paid_info_key">Ngân hàng</div>
          <div className="paid_info_value">Ngân hàng ABCDXYS</div>
        </div>
        <div className="paid_info">
          <div className="paid_info_key">Chủ tài khoản</div>
          <div className="paid_info_value">NGUYỄN VĂN A</div>
        </div>
        <div className="paid_info">
          <div className="paid_info_key">Số tài khoản</div>
          <div className="paid_info_value">ABCDXYZ123456</div>
        </div>
      </div>}
    </div>
  </div>
}