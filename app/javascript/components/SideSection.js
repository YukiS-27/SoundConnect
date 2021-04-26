import React from 'react'
import styled from 'styled-components'

const SideSectionWrapper = styled.div`
  width: 290px;
  padding: 20px 10px;
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 140px;
  padding: 10px 10px;
  margin: 0 auto;
`

const ProfileImage = styled.img`
`

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`

const MenuItems = styled.div`
  display: flex;
  justify-content: space-around;
`

const MenuItem = styled.div`
  text-align: center;
`

const UploadButton = styled.button`
  color: #fff;
  background-color: #eb6100;
  &:hover {
    color: #fff;
    background: #f56500;
  }
`

const CategoryList = styled.ul`
`

const CategoryItem = styled.li`
`


function SideSection() {
  // const [profile, setProfile] = useState({})
  // const [instrumentList, setInstrumentList] = setState([])

  return (
    <SideSectionWrapper>
      <ProfileWrapper>
        <ProfileImage />
        <UserName>
          <p>ユーザー名</p>
        </UserName>
      </ProfileWrapper>

      <MenuItems>
        <MenuItem>
          <p>プレイリスト</p>
        </MenuItem>
        <MenuItem>
          <p>メッセージ</p>
        </MenuItem>
        <MenuItem>
          <p>マイページ</p>
        </MenuItem>
      </MenuItems>
      <hr />

      <UploadButton className="btn">アップロード</UploadButton>
      <hr />

      <h4>楽器から探す</h4>
      <CategoryList>
        <CategoryItem>▼ 楽器名</CategoryItem>
        <CategoryItem>▼ 楽器名</CategoryItem>
        <CategoryItem>▼ 楽器名</CategoryItem>
      </CategoryList>

    </SideSectionWrapper>
  )
}

export default SideSection
