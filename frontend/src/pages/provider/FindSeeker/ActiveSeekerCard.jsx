function ActiveSeekerCard({ seeker }) {
  if (!seeker) return null;

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">{seeker.name}</h3>
      <p className="text-sm text-gray-600">
        Needs: {seeker.food}
      </p>
    </div>
  );
}

export default ActiveSeekerCard;
