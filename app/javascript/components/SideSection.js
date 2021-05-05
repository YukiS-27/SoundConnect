import React from 'react'
import styled from 'styled-components'
import QuestionAnswerRoundedIcon from '@material-ui/icons/QuestionAnswerRounded';
import QueueMusicRoundedIcon from '@material-ui/icons/QueueMusicRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ArrowDropDownRoundedIcon from '@material-ui/icons/ArrowDropDownRounded';
import { FiUpload } from 'react-icons/fi';


const SideSectionWrapper = styled.div`
  background-color: #fff;
  width: 290px;
  padding: 20px 10px;
`
const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5px 10px;
  text-align: center;
`

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 120px;
  padding: 5px 10px;
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
  font-size: 13px;
  text-align: center;
`

const UploadButton = styled.button`
  color: #fff;
  background-color: #eb6100;
  font-size: 18px;
  padding: 12px 30px;
  &:hover {
    color: #fff;
    background: #f56500;
    font-size: 18px;
    padding: 12px 30px;
  }
`

const CategoryList = styled.ul`
  list-style: none;
`

const CategoryItem = styled.li`

  &::before{
    content: "";
  }

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
          <QueueMusicRoundedIcon />
          <p>プレイリスト</p>
        </MenuItem>
        <MenuItem>
          <QuestionAnswerRoundedIcon />
          <p>メッセージ</p>
        </MenuItem>
        <MenuItem>
          <PersonRoundedIcon />
          <p>マイページ</p>
        </MenuItem>
      </MenuItems>
      <hr />

      <Wrapper>
        <UploadButton className="btn">
          <FiUpload />アップロード
        </UploadButton>
      </Wrapper>
      <hr />

      <h6><strong>楽器から探す</strong></h6>
      <CategoryList>
        <CategoryItem>
          <ArrowDropDownRoundedIcon />
            楽器名
        </CategoryItem>
        <CategoryItem>
          <ArrowDropDownRoundedIcon />
            楽器名
        </CategoryItem>
        <CategoryItem>
          <ArrowDropDownRoundedIcon />
            楽器名
        </CategoryItem>
      </CategoryList>
    </SideSectionWrapper>
  )
}

export default SideSection
