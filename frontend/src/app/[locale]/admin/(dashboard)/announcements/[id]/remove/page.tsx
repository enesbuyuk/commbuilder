export default async function Page({ params }: { params: { id: string } }) {
    return <div>My Post: {params.id}</div>;
}
