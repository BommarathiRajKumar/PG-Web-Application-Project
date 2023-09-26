<header style={{backgroundColor: '#317773', height: `${headerHeight}%`, width: '100%',overflow:'auto'}}>
                    <table style={{position:'relative',width:'100%',height:'100%'}}>
                        <thead>
                            <tr>
                                <th style={{textAlign: 'left',color:'black'}}>Use Filters to find your desired hostel.</th>
                            </tr>
                        </thead>

                        <tbody >
                            <tr>
                                <td  style={{width:'65%'}}>
                                    <div style={{cursor: 'pointer',border: '1px solid black',display: 'flex',justifyContent: 'space-between'}}onClick={Handler_setShowHostelTypeList}>
                                        <div>Hostel Type: {userSelectedHostelType || 'Not Selected'}</div>
                                        <div>{showHostelTypeList ? '▲' : '▼'}</div>
                                    </div>
                                    {showHostelTypeList&&
                                        <ul style={{padding: '0 15px'}}>
                                            <li onClick={() => handleHostelTypeSelect('Girls Hostel')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedHostelType === 'Girls Hostel' ? 'grey' : 'none' }}>
                                                Girls Hostel.
                                            </li>
                                            <li onClick={() => handleHostelTypeSelect('Boys Hostel')} style={{ cursor: 'pointer', background: userSelectedHostelType === 'Boys Hostel' ? 'grey' : 'none' }}>
                                                Boys Hostel.
                                            </li>
                                        </ul>
                                    }  
                                </td>
                                {showStatesList || showCitysList || showAreasList ?
                                    <td rowspan="7" className={homePageCss.scaListShowTd}> 
                                        {showStatesList && 
                                            <div style={{ height: '100%', overflow: 'auto' }}>
                                                {stateNamesLoading ? 
                                                    <div style={{height:'100%',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Oval color="#00BFFF" height={35} width={35} />
                                                    </div>
                                                : 
                                                    <ul>
                                                        <label style={{fontSize:'small', color: '#800000', position: 'relative', left: '-20px' }}>Select State Name:</label><br/><br/>
                                                        {Object.keys(stateNames).map((key) => (
                                                            <li className={homePageCss.scaListShowLi} key={stateNames[key]} onClick={() =>stateNames[key]!=="No Result"&&handleStateSelect(stateNames[key])} >
                                                                {stateNames[key]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                        {showCitysList && 
                                            <div style={{ height: '100%', overflow: 'auto' }}>
                                                {cityNamesLoading ? 
                                                    <div style={{height:'100%',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Oval color="#00BFFF" height={35} width={35} />
                                                    </div>
                                                : 
                                                    <ul>
                                                        <label style={{fontSize:'small', color: '#800000', position: 'relative', left: '-20px' }}>Select City Name:</label><br/><br/>
                                                        {Object.keys(cityNames).map((key) => (
                                                            <li className={homePageCss.scaListShowLi} key={cityNames[key]} onClick={() => cityNames[key]!=="No Result"&&handleCitySelect(cityNames[key])}>
                                                                {cityNames[key]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                        {showAreasList && 
                                            <div style={{ height: '100%', overflow: 'auto' }}>
                                                {areaNamesLoading ? 
                                                    <div style={{height:'100%',width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <Oval color="#00BFFF" height={35} width={35} />
                                                    </div>
                                                : 
                                                    <ul>
                                                        <label style={{fontSize:'small', color: '#800000', position: 'relative', left: '-20px' }}>Select Area Name:</label><br/><br/>
                                                        {Object.keys(areaNames).map((key) => (
                                                            <li className={homePageCss.scaListShowLi} key={areaNames[key]} onClick={() =>areaNames[key]!=="No Result"&&handleAreaSelect(areaNames[key])}>
                                                                {areaNames[key]}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                }
                                            </div>
                                        }
                                    </td>
                                :
                                    null
                                }
                            </tr>

                        {!showHostelTypeList && 
                            <tr>
                                <td>
                                        <div>
                                            <div style={{marginTop:'2px',cursor: 'pointer',border: '1px solid black',display: 'flex',justifyContent: 'space-between'}}onClick={Handler_setShowRoomsList}>
                                                <div>Room Type: {userSelectedRoomType || 'Not Selected'}</div>
                                                <div>{showRoomsList ? '▲' : '▼'}</div>
                                            </div>
                                            {showRoomsList&&
                                                <ul style={{padding: '0 15px'}}>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('oneShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'oneShare' ? 'grey' : 'none' }}>
                                                        oneShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('twoShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'twoShare' ? 'grey' : 'none' }}>
                                                        twoShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('threeShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'threeShare' ? 'grey' : 'none' }}>
                                                        threeShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('fourShare')} style={{marginBottom:'3px', cursor: 'pointer', background: userSelectedRoomType === 'fourShare' ? 'grey' : 'none' }}>
                                                        fourShare
                                                    </li>
                                                    <li onClick={() => HandlerSetUserSelectedRoomType('fiveShare')} style={{cursor: 'pointer', background: userSelectedRoomType === 'fiveShare' ? 'grey' : 'none' }}>
                                                        fiveShare
                                                    </li>
                                                </ul>
                                            }
                                        </div>
                                    
                                </td>
                            </tr>
                        }

                        
                        {!showHostelTypeList && !showRoomsList&&
                            <tr>
                                <td>
                                        <div>Enter &#8377;/month:
                                            <input className={homePageCss.ammountIn}  value={userSelectedPrice} placeholder={'Rs.'} type="text" onChange={(e)=>HandlerSetUserSelectedPrice(e.target.value)} />
                                        </div>
                                    
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList &&
                            <tr>
                                <td>
                                    
                                        <div>
                                            <label>State Name:</label>
                                            <input className={homePageCss.filtersIn} value={userSelectedStateName} placeholder={'Not Selected'} type="text" onClick={stateInputChangeHandler} onChange={stateInputChangeHandler} />
                                        </div>
                                    
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList &&
                            <tr>
                                <td>
                
                                    <div >
                                        <label>City Name:</label>
                                        <input style={{marginLeft:'6px'}} className={homePageCss.filtersIn} value={userSelectedCityName} placeholder={'Not Selected'} type="text" onClick={cityInputChangeHandler} onChange={cityInputChangeHandler} />
                                    </div>
                                    
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList &&
                            <tr>
                                <td>
                                    <div>
                                        <label>Area Name:</label>
                                        <input className={homePageCss.filtersIn} value={userSelectedAreaName} placeholder={'Not Selected'} type="text" onClick={areaInputChangeHandler} onChange={areaInputChangeHandler} />
                                    </div>
                                </td>
                            </tr>
                        }

                        {!showHostelTypeList && !showRoomsList&&
                            <tr>
                                <td>
                                    <button style={{marginBottom:'10px'}} className={homePageCss.pgAndSearchButton} onClick={HandlerSearch}>Search</button>
                                    <button style={{marginBottom:'10px',marginLeft:'18px'}} className={homePageCss.cancelButton} onClick={searchCancelHandler}>Cancel</button>
                                    {formErr && !showStatesList && !showCitysList && !showAreasList && <div  style={{color: '#8B0000'}}>{errToPrint}</div>}
                                </td>
                            </tr>
                        }

                        </tbody>
                    </table>
</header>