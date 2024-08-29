'use client'
import { InfoIcon } from './InfoIcon';
import { FeedbackIcon } from './FeedbackIcon';
import {Tabs, Tab, Card, CardBody} from "@nextui-org/react";
import { useDoctorContext } from '@/context/DoctorProvider';
import React, { useEffect, useState } from 'react'

export default function TabsUI({ params }: { params: { slug: string } }) {
    const {getCurrentDoctor}  = useDoctorContext();
    const [data, setData] = useState(null);

    useEffect(()=>{
        setData(getCurrentDoctor());  
    },[])

    if(!data)
        return null
    return (
        <div className="flex w-full flex-col">
            <Tabs aria-label="Options" variant="bordered">
                <Tab key="info" title={
                <div className="flex items-center space-x-2">
                    <InfoIcon />
                    <span>Info</span>
                </div>
                }>
                <Card>
                    <CardBody>

                        <table class="table-auto">
                            <thead>
                                <tr>
                                <th>Locations</th>
                                <th>Timings</th>
                                </tr>
                            </thead>
                            <tbody>
                       
                                {
                                    data.doctorTiming.map((obj)=>{
                                        return <tr>
                                            <td>{obj.location[0].hospital}</td>
                                            <td>{obj.timing.day} {obj.timing.start_time}-{obj.timing.end_time}</td>
                                        </tr>
                                    })
                                }
                                
                           
                            </tbody>
                        </table>
                    </CardBody>
                </Card>  
                </Tab>
                <Tab key="Reviews" title={
                <div className="flex items-center space-x-2">
                    <FeedbackIcon />
                    <span>Reviews</span>
                </div>
                }>
                <Card>
                    <CardBody>
                    {data.feedback.map((obj)=> {
                        return <p>{obj.comments}</p>
                    })}
                  
                    </CardBody>
                </Card>  
                </Tab>
                
            </Tabs>
        </div>  

    )
}