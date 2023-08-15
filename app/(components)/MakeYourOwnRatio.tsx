import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

export function MakeYourOwnRatio() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Generate</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Generate</h4>
            <p className="text-sm text-muted-foreground">
              {`Paste in the URL of a quote tweet or provide a tweet with
              it\s reply to generate.`}
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="width">Tweet</Label>
              <Input
                id="width"
                placeholder="https://twitter.com/Jacksonmills/status/1690757261679853568"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="replyTweet">Reply</Label>
              <Input
                id="replyTweet"
                placeholder="optional"
                className="col-span-2 h-8"
              />
            </div>
            <Button variant={`ratio`}>Make it!</Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
