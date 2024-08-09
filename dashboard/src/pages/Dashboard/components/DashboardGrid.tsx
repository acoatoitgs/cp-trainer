import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import DashboardCard from './DashboardCard';

import './DashboardGrid.css';


const DashboardGrid: React.FC = () => {
    return (
        <div className='dashboard-grid'>
            <Container fluid>
                <Row className='top-grid-row'>
                    <Col md={4}><DashboardCard content="id-1" /></Col>
                    <Col md={4}><DashboardCard content="id-2" /></Col>
                    <Col md={4}><DashboardCard content="id-3" /></Col>
                </Row>

                <Row>
                    <Col md={4}><DashboardCard content="id-4" /></Col>
                    <Col md={8}><DashboardCard content="id-5" /></Col>
                </Row>
            </Container >

        </div >
    );
};

export default DashboardGrid;
