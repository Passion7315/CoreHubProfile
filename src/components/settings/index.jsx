import { useState } from "react";
import { FiSettings } from "react-icons/fi";
import {
    Box,
    Button,
    Chip,
    Divider,
    Drawer,
    Grid,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    AddPhotoAlternate,
    ArrowForward,
    CheckBox,
    CheckBoxOutlineBlank,
    ColorizeSharp,
    RestartAlt,
} from "@mui/icons-material";
import { ChromePicker } from "react-color";
import rgbHex from "rgb-hex";
import Theme from "../../data/theme.json";
import Wallpaper from "../../data/wallpapers.json";
import { useCookies, CookiesProvider } from "react-cookie";

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
    width: "250px",
    height: "100vh",
    borderLeft: "1px solid gray",
    backgroundColor: Theme[CURRENT_THEME_NO].backgroundColor,
    color: Theme[CURRENT_THEME_NO].fontColor,
    "& .MuiSvgIcon-root": {
        color: Theme[CURRENT_THEME_NO].fontColor,
        width: "24px",
        height: "24px",
    },
    "& span": {
        fontSize: "16px",
    },
};

const Settings = () => {
    // const [isModal, setModal] = useState(false);
    // const openModal = () => {
    //   setModal(true);
    // }

    // const closeModal = () => {
    //   setModal(false);
    // }
    const [cookies, setCookie] = useCookies(["updateThemeFlag"]);

    const [viewSettingDrawer, setViewSettingDrawer] = useState(false);
    const [viewColorSetDrawer, setViewColorSetDrawer] = useState(false);

    const [newTheme, setNewTheme] = useState({
        backgroundColor: "#ffffffff",
        backgroundImage: "",
        blurMode: false,
    });
    const [updateValue, setUpdateValue] = useState(false);

    const [colorPickerColor, setColorPickerColor] = useState("#ffffffff");
    const [blurMode, setBlurMode] = useState(false);
    const [uploadImageList, setImageList] = useState([]);
    const upgradeTheme = async (
        backgroundColor_u,
        backgroundImage_u,
        blurMode_u
    ) => {
        try {
            const tempTheme = {
                backgroundColor: backgroundColor_u,
                backgroundImage: backgroundImage_u,
                blurMode: blurMode_u,
            };

            localStorage.setItem("theme", JSON.stringify(tempTheme));
            setCookie(
                "updateThemeFlag",
                cookies.updateThemeFlag == "false" ? "true" : "false"
            );
            setNewTheme(tempTheme);
            setUpdateValue(!updateValue);
        } catch (e) {
            console.log(">>>>>>>>>>>>Exception", e);
        }
    };

    const handleUploadClick = (event) => {
        try {
            var file = event.target.files[0];
            const reader = new FileReader();
            var url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
                var image = new Image();
                //Set the Base64 string return from FileReader as source.
                image.src = e.target.result;

                //Validate the File Height and Width.
                image.onload = function () {
                    var height = this.height;
                    var width = this.width;
                    // if (height > 100 || width > 100)
                    console.log(height, width);
                };

                let tempImageList = [...uploadImageList];
                if (!tempImageList.find((item) => item == image.src))
                    tempImageList.push(image.src);
                setImageList(tempImageList);

                upgradeTheme(
                    newTheme.backgroundColor,
                    image.src,
                    newTheme.blurMode
                );
                //console.log(">>>>>>>>>image", image.src, e.target);
            };
        } catch (e) {
            console.log(">>>>>>>>>>>>>Exception", e);
        }
    };

    return (
        <div className="icon-box">
            <div
                className="icon-setting"
                onClick={() => setViewSettingDrawer(true)}
            >
                <FiSettings size={18} />
            </div>
            <Drawer
                anchor="right"
                open={viewSettingDrawer}
                onClose={() => setViewSettingDrawer(false)}
            >
                <Box sx={DRAWER_STYLE}>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => setViewSettingDrawer(false)}
                        >
                            <ListItemText
                                primary={"Theme Setting"}
                                sx={{
                                    textTransform: "uppercase",
                                    "& span": {
                                        fontSize: "18px",
                                        fontWeight: "700",
                                    },
                                }}
                            />
                            <ListItemIcon
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "right",
                                }}
                            >
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
                            <ListItemText primary={"Upload image"} />
                            <input
                                accept="image/*"
                                // className={classes.input}
                                style={{
                                    opacity: 0,
                                    position: "absolute",
                                    width: "90%",
                                }}
                                id="contained-button-file"
                                // multiple
                                type="file"
                                onChange={handleUploadClick}
                            />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => setViewColorSetDrawer(true)}
                        >
                            <ListItemIcon>
                                <ColorizeSharp />
                            </ListItemIcon>
                            <ListItemText primary={"Set a color"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => upgradeTheme("#ffffffff", "", false)}
                        >
                            <ListItemIcon>
                                <RestartAlt />
                            </ListItemIcon>
                            <ListItemText primary={"Reset to default"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() =>
                                upgradeTheme(
                                    newTheme.backgroundColor,
                                    newTheme.backgroundImage,
                                    !newTheme.blurMode
                                )
                            }
                        >
                            <ListItemIcon>
                                {newTheme.blurMode ? (
                                    <CheckBox />
                                ) : (
                                    <CheckBoxOutlineBlank />
                                )}
                            </ListItemIcon>
                            <ListItemText primary={"Blurred"} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '28px',
                        }}>
                            <Divider sx={{ width: '100%', position: 'absolute', top: '12px' }} />
                            <Box sx={{
                                position: 'absolute',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Chip label="Default background"
                                    sx={{
                                        height: '28px',
                                        color: 'white',
                                        backgroundColor: '#13131d',
                                        '& .MuiChip-label': {
                                            fontSize: '11px',
                                        }

                                    }} />
                            </Box>
                        </Box>
                    </ListItem>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            padding: "10px",
                        }}
                    >
                        {Wallpaper?.length > 0 &&
                            Wallpaper.map((item) => (
                                <Grid item xs={4}>
                                    <Button
                                        onClick={() =>
                                            upgradeTheme(
                                                "#ffffffff",
                                                item.imageUrl,
                                                newTheme.blurMode
                                            )
                                        }
                                        sx={{
                                            padding: "0",
                                            margin: "0",
                                        }}
                                    >
                                        <img
                                            alt=""
                                            src={item.thumbnail}
                                            style={{
                                                border: "1px solid gray",
                                            }}
                                        />
                                    </Button>
                                </Grid>
                            ))}
                    </Grid>
                    <ListItem>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '28px',
                        }}>
                            <Divider sx={{ width: '100%', position: 'absolute', top: '12px' }} />
                            <Box sx={{
                                position: 'absolute',
                                width: '100%',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                            }}>
                                <Chip label="Uploaded background"
                                    sx={{
                                        height: '28px',
                                        color: 'white',
                                        backgroundColor: '#13131d',
                                        '& .MuiChip-label': {
                                            fontSize: '11px',
                                        }

                                    }} />
                            </Box>
                        </Box>
                    </ListItem>
                    <Grid
                        container
                        spacing={1}
                        sx={{
                            padding: "10px",
                        }}
                    >
                        {uploadImageList.length > 0 &&
                            uploadImageList.map((item) => (
                                <Grid item xs={4}>
                                    <Button
                                        onClick={() =>
                                            upgradeTheme(
                                                "#ffffffff",
                                                item,
                                                newTheme.blurMode
                                            )
                                        }
                                        sx={{
                                            padding: "0",
                                            margin: "0",
                                        }}
                                    >
                                        <img
                                            alt=""
                                            src={item}
                                            style={{
                                                border: "1px solid gray",
                                                width: "70px",
                                                height: "70px",
                                            }}
                                        />
                                    </Button>
                                </Grid>
                            ))}
                    </Grid>
                </Box>
            </Drawer>
            <Drawer
                anchor="right"
                open={viewColorSetDrawer}
                onClose={() => setViewColorSetDrawer(false)}
            >
                <Box sx={DRAWER_STYLE}>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => setViewColorSetDrawer(false)}
                        >
                            <ListItemText
                                primary={"Set a color"}
                                sx={{
                                    "& span": {
                                        fontSize: "18px",
                                        fontWeight: "700",
                                    },
                                }}
                            />
                            <ListItemIcon
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "right",
                                }}
                            >
                                <ArrowForward />
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ChromePicker
                            color={colorPickerColor}
                            onChangeComplete={(c) =>
                                setColorPickerColor(
                                    "#" +
                                    rgbHex(
                                        c.rgb.r,
                                        c.rgb.g,
                                        c.rgb.b,
                                        c.rgb.a
                                    )
                                )
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <Box sx={{
                            position: 'relative',
                            width: '100%',
                            height: '50px',
                            border: '1px solid gray',
                        }}>
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backgroundImage: 'url(./images/bg/bg-transparent.jpg)',
                                }}
                            />
                            <Box
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    backgroundColor: colorPickerColor,
                                }}
                            />
                        </Box>
                    </ListItem>
                    <ListItem>
                        <ListItemButton
                            onClick={() =>
                                upgradeTheme(colorPickerColor, "", false)
                            }
                            sx={{
                                border: "1px solid white",
                            }}
                        >
                            <ListItemText
                                primary={"Use this color"}
                                sx={{
                                    textAlign: "center",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                </Box>
            </Drawer>
        </div>
    );
};

export default Settings;
