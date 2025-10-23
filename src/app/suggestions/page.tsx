"use client";

import MobileLayout from "@/components/layout/MobileLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, MessageSquare, CheckCircle, RotateCcw } from "lucide-react";
import { useSuggestionStore } from "@/store/suggestionStore";
import { format } from "date-fns";

const SuggestionManagement = () => {
  const { suggestions, deleteSuggestion, markAnswered } = useSuggestionStore();

  return (
    <MobileLayout>
      <div className="p-4 space-y-6">
        <h1 className="text-3xl font-bold">Student Suggestions</h1>
        <p className="text-muted-foreground">Review feedback and ideas from your students.</p>

        <Card>
          <CardHeader>
            <CardTitle>Inbox ({suggestions.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestions.length > 0 ? (
              suggestions.map(suggestion => (
                <div key={suggestion.id} className={`border p-3 rounded-lg bg-card shadow-sm ${suggestion.isAnswered ? 'opacity-70 border-l-4 border-green-500' : 'border-l-4 border-primary'}`}>
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="font-semibold">
                        {suggestion.isAnonymous ? "Anonymous Student" : suggestion.studentId ? `Student ID: ${suggestion.studentId}` : "Unknown Student"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {format(suggestion.createdAt, 'MMM do, p')}
                      </p>
                    </div>
                    <div className="flex space-x-1">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => markAnswered(suggestion.id, !suggestion.isAnswered)}
                          className={suggestion.isAnswered ? 'text-green-600 hover:bg-green-50' : 'text-muted-foreground hover:text-primary'}
                        >
                          {suggestion.isAnswered ? <RotateCcw className="h-4 w-4" title="Mark Unanswered" /> : <CheckCircle className="h-4 w-4" title="Mark Answered" />}
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => deleteSuggestion(suggestion.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm">{suggestion.content}</p>
                  {suggestion.isAnswered && (
                      <p className="mt-2 text-xs text-green-600 flex items-center">
                          <CheckCircle className="h-3 w-3 mr-1" /> Reviewed/Answered
                      </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center p-4">No new suggestions at this time.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </MobileLayout>
  );
};

export default SuggestionManagement;