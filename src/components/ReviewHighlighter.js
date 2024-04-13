import React, { useState } from "react";
import Tooltip from "./Tooltip";

function ReviewHighlighter({ review }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const highlighter = (sentence, sentiment, start, end, topic) => {
    const handleMouseOver = (e) => {
      // Calculate tooltip position
      const boundingRect = e.target.getBoundingClientRect();
      const top = boundingRect.top + window.scrollY - 30;
      const left = boundingRect.left + window.scrollX + start * 6;

      // Show tooltip on mouse over
      setShowTooltip(true);
      setTooltipText(topic);
      setTooltipPosition({ top, left });
    };

    const handleMouseLeave = () => {
      // Hide tooltip on mouse leave
      setShowTooltip(false);
    };

    switch (sentiment) {
      case "Positive":
        return (
          <div>
            <span>{sentence.slice(0, start)}</span>
            <span
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              className="bg-green-200 cursor-pointer"
            >
              {sentence.slice(start, end)}
            </span>
            <span>{sentence.slice(end)}</span>
          </div>
        );
      case "Negative":
        return (
          <div>
            <span>{sentence.slice(0, start)}</span>
            <span 
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              className="bg-red-200 cursor-pointer"
            >
              {sentence.slice(start, end)}
            </span>
            <span>{sentence.slice(end)}</span>
          </div>
        );
        case "Mixed":
          return (
            <div>
              <span>{sentence.slice(0, start)}</span>
              <span
                onMouseOver={handleMouseOver}
                onMouseLeave={handleMouseLeave}
                className="bg-yellow-200 cursor-pointer"
              >
                {sentence.slice(start, end)}
              </span>
              <span>{sentence.slice(end)}</span>
            </div>
          );
      case "Neutral":
        return (
          <div>
            <span>{sentence.slice(0, start)}</span>
            <span
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
              className="bg-Lime-200 cursor-pointer"
            >
              {sentence.slice(start, end)}
            </span>
            <span>{sentence.slice(end)}</span>
          </div>
        );
      default:
        return sentence.slice(start, end);
    }
  };

  return (
    <div className="review-highlighter border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-slate-100">
      <div className="font-semibold text-lg mb-2">
        By {review.reviewer_name}
      </div>
      <div className="text-xs text-gray-500">{review.date}</div>
      <div className="text-sm mb-2">
        Topic: {review.topic ? review.topic : "N/A"}
      </div>
      <div className="text-base mb-2">
        {review.analytics && review.analytics.length > 0 ? (
          review.analytics.map((analytics, index) =>
            analytics.sentences.map((sentence, i) => (
              <React.Fragment key={i}>
                {highlighter(
                  review.content,
                  analytics.sentiment,
                  analytics.highlight_indices[i][0],
                  analytics.highlight_indices[i][1],
                  analytics.topic
                )}
              </React.Fragment>
            ))
          )
        ) : (
          <div>{review.content}</div>
        )}
      </div>

      {showTooltip && (
        <Tooltip
          text={tooltipText}
          top={tooltipPosition.top}
          left={tooltipPosition.left}
        />
      )}
    </div>
  );
}

export default ReviewHighlighter;
