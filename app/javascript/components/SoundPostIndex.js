import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'
import { ImCheckboxChecked, ImCheckboxUnchecked } from 'react-icons/im'

import SideSection from './SideSection'

const TopPageWrapper = styled.div`
  display: flex;
  height: 100%;
`

const MainWrapper = styled.div`
`

function SoundPostIndex() {
  return (
    <TopPageWrapper>
      <SideSection

      />

      <div className="main-wrapper">

        <div className="container">

        </div>
      </div>
    </TopPageWrapper>
  )
}

export default SoundPostIndex
