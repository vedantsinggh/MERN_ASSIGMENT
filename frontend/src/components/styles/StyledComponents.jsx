import { styled } from "@mui/material"
import {Link as LinkComponent} from 'react-router-dom'
import { grayColor,matBlack } from "../../constants/color";

//here instyled component me kuch html ka element yha fr 
export const visuallyHiddenInput = styled("input")`
    border:0,
    clip:"rect(0 0 0 0)",
    height:1,
    margin:-1,
    overflow:"hidden",
    padding:0,
    position:"absolute",
    whiteSpace:"nowrap",
    width:1,
`;