import { Tweet } from './Tweet';
export const Listning = ({ thoughts }) => {
    return (
        <div className="tweets">
          {thoughts.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet} />
              ))}
     </div>
    );
};