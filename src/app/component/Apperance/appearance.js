import React from 'react';
import './appearance.css';
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Color1 from '../../../Assets/color1.PNG'
import Color2 from '../../../Assets/color2.PNG'
import Color3 from '../../../Assets/color3.PNG'
const Appearance = () => {
    return (
        <div>
            <div className="heading col-md-6">
                <h3>Profile</h3>
            </div>
            <div className="row">
                <div className="profile col-xs-12">
                    <div className="info row">
                        <div className="col-xs col-lg">
                            <Avatar className="avatar" style={{'width':'120px', 'height': '100px','backgroundColor':'lightgreen'}} />
                        </div>
                        <div className="buttons buttonss col-xs col-lg">
                            <Button style={{ maxWidth: '400px', maxHeight: '70px', minWidth: '250px', minHeight: '30px', 'borderRadius': '50px' }} variant="contained" color="primary">Pic an Image</Button>
                        </div>
                        <div className="buttons col-xs col-lg">
                            <Button style={{ maxWidth: '400px', maxHeight: '70px', minWidth: '250px', minHeight: '30px', 'borderRadius': '50px' }} variant="contained">Remove</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="heading_themes">
                <h3>Themes</h3>
            </div>
             <div className="themes">
                <div className="row pt-2 pl-2 content">
                    <div className="col col-xs">
                        <img src={Color1} style={{ 'width': '200px', 'height': '300px' }} />
                        <br></br>
                        
                    </div>
                    <div className="col col-xs">
                        <img src={Color2} style={{ 'width': '200px', 'height': '300px' }} />
                       
                    </div>
                    <div className="col col-xs">
                        <img src={Color3} style={{ 'width': '200px', 'height': '300px' }} />
                        
                    </div>
                </div>
             
                </div>
            </div>
    );
}

export default Appearance;