import styles from '../styles/pages/Dashboard.module.css';

import {useOutletContext} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {gql, useQuery} from "@apollo/client";
import {Button, Card, CardBody, CardHeader, Col, Row} from "reactstrap";
import Spinner from "../components/Spinner";
import moment from "moment";

const MY_QUERY_QUERY = gql`query MyQuery {
  events{
    id
    name
    created_at
    description
  }
}`;

const Dashboard = () => {
    const {user} = useOutletContext();

    const {loading, error, data} = useQuery(MY_QUERY_QUERY)

    console.log('DATA', data)

    if (!data) return null

    if (loading) return <Spinner/>

    return (
        <>
            <Helmet>
                <title>Dashboard - Nhost</title>
            </Helmet>

            <div>
                <h2 className={styles.title}>Dashboard</h2>

                <p className={styles['welcome-text']}>
                    Welcome, {user?.metadata?.firstName || 'stranger'}{' '}
                    <span role="img" alt="hello">
            👋
          </span>
                </p>
                <hr/>
                <Button>Create event</Button>
                <Row className='mt-5'>
                    {data?.events?.map((item, index) => <Col className='mb-2' key={index} md={3}>
                        <Card>
                            <CardHeader>
                                <h5>{item?.name}</h5>
                                <small className='text-muted small'>{moment(item?.created_at).format('LL')}</small>
                            </CardHeader>
                            <CardBody>
                                {item?.description}
                            </CardBody>
                        </Card>
                    </Col>)}
                </Row>


            </div>
        </>
    );
};

export default Dashboard;
