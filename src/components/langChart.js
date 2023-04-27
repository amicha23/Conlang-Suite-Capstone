import computeStat from '../pages/api/language/computeWordStats';




const langChart = (queryParam) => {
    let statsData = computeStat({
        lid: queryParam,
        // field:  TODO: field name should pass in,
    });
    
    
    return (
        <div>
            <h1>LANGCHART</h1>
        </div>
    );
}
export default langChart;

