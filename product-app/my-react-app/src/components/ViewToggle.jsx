export default function ViewToggle({ view, setView }) {
  return (
<div>
<button onClick={() => setView("list")}>List View</button>
<button onClick={() => setView("card")}>Card View</button>
</div>
  );
}