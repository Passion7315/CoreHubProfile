import { useState } from 'react';
import { FiSettings } from 'react-icons/fi';
import { Box, Button, Divider, Drawer, Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { AddPhotoAlternate, ArrowForward, CheckBox, CheckBoxOutlineBlank, ColorizeSharp, RestartAlt } from '@mui/icons-material';
import { ChromePicker } from 'react-color';
import rgbHex from 'rgb-hex';
import Theme from "../../data/theme.json";
import Wallpaper from "../../data/wallpapers.json";


// import { FaBook } from 'react-icons/fa';
// import Image from "next/image";
// import Modal from 'react-modal';
// import ColorSwitcher from "@components/color-switcher";
// import Carosuel from "@ui/carousel";
// import TutorialData from "../../data/tutorial.json";


// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     width: '700px'
//   },
//   overlay: {
//     backgroundColor: "rgba(0, 0, 0, 0.66)",
//     zIndex: 10000
//   },
// };

const CURRENT_THEME_NO = 0;

const DRAWER_STYLE = {
  width: '250px',
  height: '100vh',
  borderLeft: '1px solid gray',
  backgroundColor: Theme[CURRENT_THEME_NO].backgroundColor,
  color: Theme[CURRENT_THEME_NO].fontColor,
  '& .MuiSvgIcon-root': {
    color: Theme[CURRENT_THEME_NO].fontColor,
    width: '24px',
    height: '24px',
  },
  '& span': {
    fontSize: '16px',
  }
}

const Settings = () => {
  // const [isModal, setModal] = useState(false);
  // const openModal = () => {
  //   setModal(true);
  // }

  // const closeModal = () => {
  //   setModal(false);
  // }

  const [viewSettingDrawer, setViewSettingDrawer] = useState(false);
  const [viewColorSetDrawer, setViewColorSetDrawer] = useState(false);

  const [newTheme, setNewTheme] = useState({
    backgroundColor: '#ffffff00',
    bakcgroundImage: '',
    blurMode: false,
  });
  const [updateValue, setUpdateValue] = useState(false);

  const upgradeTheme = async (backgroundColor_u, backgroundImage_u, blurMode_u) => {
    console.log('upgradeTheme log - 1 : ', backgroundColor_u, backgroundImage_u, blurMode_u);
    const tempTheme = {
      backgroundColor: backgroundColor_u,
      bakcgroundImage: backgroundImage_u,
      blurMode: blurMode_u,
    };
    console.log('upgradeTheme log - 2 : ', tempTheme);
    localStorage.setItem('theme', JSON.stringify(tempTheme));
    setNewTheme(tempTheme);
    setUpdateValue(!updateValue);
  }

  const [colorPickerColor, setColorPickerColor] = useState('#ffffff00');
  const [blurMode, setBlurMode] = useState(false);

  return (
    <div className="icon-box">
      <div className="icon-setting"
        onClick={() => setViewSettingDrawer(true)}
      >
        <FiSettings size={18} />
      </div>
      <Drawer
        anchor='right'
        open={viewSettingDrawer}
        onClose={() => setViewSettingDrawer(false)}
      >
        <Box sx={DRAWER_STYLE}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setViewSettingDrawer(false)}>
              <ListItemText primary={'Theme Setting'}
                sx={{
                  textTransform: 'uppercase',
                  '& span': {
                    fontSize: '18px',
                    fontWeight: '700',
                  }
                }} />
              <ListItemIcon sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
              }}>
                <ArrowForward />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AddPhotoAlternate />
              </ListItemIcon>
              <ListItemText primary={'Upload image'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setViewColorSetDrawer(true)}>
              <ListItemIcon>
                <ColorizeSharp />
              </ListItemIcon>
              <ListItemText primary={'Set a color'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <RestartAlt />
              </ListItemIcon>
              <ListItemText primary={'Reset to default'} />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => upgradeTheme(newTheme.backgroundColor, newTheme.bakcgroundImage, !newTheme.blurMode)}>
              <ListItemIcon>
                {
                  blurMode ?
                    <CheckBox /> :
                    <CheckBoxOutlineBlank />
                }
              </ListItemIcon>
              <ListItemText primary={'Blurred'} />
            </ListItemButton>
          </ListItem>
          <Grid container spacing={1}
            sx={{
              padding: '10px',
            }}>
            {
              Wallpaper?.length > 0 &&
              Wallpaper.map((item) => (
                <Grid item xs={4}>
                  <Button
                    onClick={() => upgradeTheme(newTheme.backgroundColor, item.imageUrl, newTheme.blurMode)}
                    sx={{
                      padding: '0',
                      margin: '0',
                    }}>
                    <img alt='' src={item.thumbnail}
                      style={{
                        border: '1px solid gray',
                      }} />
                  </Button>
                </Grid>
              ))
            }
          </Grid>
        </Box>
      </Drawer>
      <Drawer
        anchor='right'
        open={viewColorSetDrawer}
        onClose={() => setViewColorSetDrawer(false)}
      >
        <Box sx={DRAWER_STYLE}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setViewColorSetDrawer(false)}>
              <ListItemText primary={'Set a color'}
                sx={{
                  '& span': {
                    fontSize: '18px',
                    fontWeight: '700',
                  }
                }} />
              <ListItemIcon sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'right',
              }}>
                <ArrowForward />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ChromePicker
              color={colorPickerColor}
              onChangeComplete={(c) => setColorPickerColor("#" + rgbHex(c.rgb.r, c.rgb.g, c.rgb.b, c.rgb.a))}
            />
          </ListItem>
          <ListItem>
            <Box sx={{
              width: '100%',
              height: '50px',
              backgroundColor: colorPickerColor,
            }} />
          </ListItem>
          <ListItem>
            <ListItemButton
              onClick={() => upgradeTheme(colorPickerColor, newTheme.bakcgroundImage, newTheme.blurMode)}
              sx={{
                border: '1px solid white',
              }}>
              <ListItemText primary={'Use this color'}
                sx={{
                  textAlign: 'center',
                }} />
            </ListItemButton>
          </ListItem>
        </Box>
      </Drawer>
      {/* <div className="rn-dropdown py-4 px-5">
        <div className="setting-container">
          <button className="setting-tutorial" onClick={openModal}>
            <FaBook size={16} />
            <span>TUTORIAL</span>
          </button>
          <div className="setting-lang">
            <select className="select-lang">
              <option>eng</option>
              <option>esp</option>
              <option>deu</option>
              <option>fra</option>
              <option>portuguese</option>
              <option>ita</option>
              <option>ned</option>
              <option>lat</option>
              <option>svenska</option>
              <option>polski</option>
              <option>русский</option>
              <option>ellinikí</option>
              <option>türk</option>
              <option>Việt</option>
              <option>tagalog</option>
              <option>日本語</option>
              <option>中文简体</option>
              <option>中文繁體</option>
              <option>한국인</option>
              <option>عربى</option>
              <option>فارسی</option>
            </select>
          </div>
          <div id="my_switcher" className="setting-option my_switcher">
            <ColorSwitcher />
          </div>
        </div>
        <Modal
          className="tutorial-modal"
          isOpen={isModal}
          style={customStyles}
          contentLabel="Tutorial Modal"
        >
          <div className='w-100'>
            {TutorialData.length > 0 && (
              <Carosuel dots={false} items={1}>
                {
                  TutorialData.map(item => (
                    <div className='tutorial-page' key={item.id}>
                      <Image
                        src={item.image.src}
                        alt={item.title}
                        width={500}
                        height={400}
                      />
                      <div className='tutorial-content'>
                        <h3 className='mb--5'>{item.title}</h3>
                        <span className='fs-3 mb--5'>{item.description}</span>
                        {
                          item.id === 5 && (
                            <button className='btn-end-tutorial' onClick={closeModal}>Get Started</button>
                          )
                        }
                      </div>
                    </div>
                  ))
                }
              </Carosuel>
            )}
          </div>
        </Modal>
      </div> */}
    </div>
  );
};

export default Settings;
